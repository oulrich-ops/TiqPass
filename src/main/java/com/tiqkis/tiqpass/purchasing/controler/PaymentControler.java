package com.tiqkis.tiqpass.purchasing.controler;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.stripe.exception.StripeException;
import com.stripe.model.Customer;
import com.stripe.model.Event;
import com.stripe.model.checkout.Session;
import com.stripe.net.Webhook;
import com.stripe.param.CustomerCreateParams;
import com.stripe.param.checkout.SessionCreateParams;
import com.tiqkis.tiqpass.common.ApiResponse;
import com.tiqkis.tiqpass.common.ImageUtils;
import com.tiqkis.tiqpass.common.interfaces.ApiResponseUtil;
import com.tiqkis.tiqpass.common.service.EmailService;
import com.tiqkis.tiqpass.domain.model.Payer;
import com.tiqkis.tiqpass.domain.purchasing.Order;
import com.tiqkis.tiqpass.domain.purchasing.OrderItem;
import com.tiqkis.tiqpass.domain.purchasing.OrderStatus;
import com.tiqkis.tiqpass.domain.purchasing.Ticket;
import com.tiqkis.tiqpass.purchasing.api.PaymentApi;
import com.tiqkis.tiqpass.purchasing.dto.OrderLine;
import com.tiqkis.tiqpass.purchasing.dto.PurchaseDTO;
import com.tiqkis.tiqpass.purchasing.repository.TicketRepository;
import com.tiqkis.tiqpass.purchasing.service.OrderItemService;
import com.tiqkis.tiqpass.purchasing.service.OrderService;
import com.tiqkis.tiqpass.purchasing.service.TicketPdfService;
import com.tiqkis.tiqpass.user.service.CustomersService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;
import java.util.stream.Collectors;

@RestController
public class PaymentControler implements PaymentApi {


    private final String clientBaseUrl;
    private final String stripeWebhookSecret;
    private final CustomersService customersService;
    private final OrderItemService orderItemService;
    private final OrderService orderService;
    private final TicketRepository ticketRepository;
    private final EmailService emailService;
    private final TicketPdfService ticketPdfService;
    String staticFileBaseUrl ="http://127.0.0.1:8080/api/tiqpass/v1";


    public PaymentControler(
            @Value("${CLIENT_BASE_URL}") String clientBaseUrl,
            @Value("${stripe.webhook.secret}") String stripeWebhookSecret,
            CustomersService customersService,
            OrderItemService orderItemService,
            OrderService orderService,
            TicketRepository ticketRepository,
            EmailService emailService,
            TicketPdfService ticketPdfService
    ) {
        this.clientBaseUrl = clientBaseUrl;
        this.stripeWebhookSecret = stripeWebhookSecret;
        this.customersService = customersService;
        this.orderItemService = orderItemService;
        this.orderService = orderService;
        this.ticketRepository = ticketRepository;
        this.emailService = emailService;
        this.ticketPdfService = ticketPdfService;
    }





    @Override
    public ResponseEntity<ApiResponse<Map<String, String>>> createSession(PurchaseDTO purchase) throws StripeException, JsonProcessingException {

        Customer customer = Customer.create(CustomerCreateParams.builder()
                .setEmail(purchase.getCustomer().getEmail())
                .setName(purchase.getCustomer().getFirstName() + " " + purchase.getCustomer().getLastName())
                .build());
        Payer payer = customersService.findByEmail(purchase.getCustomer().getEmail());

        if (payer == null){
            customersService.addNewCustomer(purchase.getCustomer());
        }

        Order order = orderService.createOrderFromFrontend(purchase,payer);
        Map<String, String> metadata = new HashMap<>();
        metadata.put("eventId", String.valueOf(purchase.getEventId()));
        metadata.put("tickets", new ObjectMapper().writeValueAsString(purchase.getTickets()));
        metadata.put("orderId", String.valueOf(order.getId()));



        List<SessionCreateParams.LineItem> lineItems = purchase.getTickets().stream().map(ticket ->
                SessionCreateParams.LineItem.builder()
                        .setQuantity(Long.valueOf(ticket.getQuantity()))
                        .setPriceData(SessionCreateParams.LineItem.PriceData.builder()
                                .setCurrency("eur")
                                .setUnitAmount((long) (ticket.getPrice() * 100))
                                .setProductData(SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                        .setName(ticket.getCategoryName())
                                        .build())
                                .build())
                        .build()
        ).collect(Collectors.toList());

        SessionCreateParams params = SessionCreateParams.builder()
                .addAllLineItem(lineItems)
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl(clientBaseUrl + "/payment/success")
                .setCancelUrl(clientBaseUrl + "/payment/failure")
                .setCustomer(customer.getId())
                .setInvoiceCreation(
                SessionCreateParams.InvoiceCreation.builder()
                        .setEnabled(true)
                        .build())
                .putAllMetadata(metadata)
                .build();

        try {
            Session session = Session.create(params);
            ApiResponse<Map<String, String>> response = ApiResponseUtil.buildApiResponse("Evenement creé avec succès !", Map.of("sessionId", session.getId()), HttpStatus.OK.value());
            return new ResponseEntity<>(response, HttpStatus.OK);

        } catch (StripeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponseUtil.buildApiResponse("Une erreur est survenue",
                            Map.of("error", e.getMessage()),
                            HttpStatus.INTERNAL_SERVER_ERROR.value()));

        }
    }

    public ResponseEntity<String> handleStripeWebhook(String payload,String sigHeader) {
        System.out.println("on est rnetré dans le webhook");
        try {
            Event event = Webhook.constructEvent(payload, sigHeader, stripeWebhookSecret);

            if ("checkout.session.completed".equals(event.getType())) {
                Session session = (Session) event.getDataObjectDeserializer()
                        .getObject()
                        .orElseThrow(() -> new IllegalStateException("Session non trouvée"));


                String eventId = session.getMetadata().get("eventId");
                String ticketsJson = session.getMetadata().get("tickets");
                Order order = orderService.findOrderById(Long.valueOf(session.getMetadata().get("orderId")));



                Payer customer = customersService.findByEmail(session.getCustomerDetails().getEmail());


                List<Ticket> tickets = new ArrayList<>();


                for (OrderItem item : order.getItems()) {
                    for (int i = 0; i < item.getQuantity(); i++) {
                        Ticket ticket = new Ticket();
                        ticket.setOrderItem(item);
                        ticket.setValidationCode(UUID.randomUUID().toString());
                        byte[] qrImage = ImageUtils.generateQRCode(ticket.getValidationCode());
                        ticket.setQrCodeImage(qrImage);

                        ticketRepository.save(ticket);
                        tickets.add(ticket);
                    }
                }

                order.setStripeSessionId(session.getId());
                order.setStatus(OrderStatus.PAID);

                orderService.save(order);

                String customerName = customer.getFirstName() +" "+customer.getLastName();
                String eventName = order.getTicketing().getName();
                String eventDate = order.getTicketing().getStartDate().toString();
                String primaryColor = "#0000FF"; // Couleur par défaut : bleu

// Vérifier chaque niveau pour éviter les NullPointerException
                if (order.getTicketing() != null &&
                        order.getTicketing().getCustomization() != null &&
                        order.getTicketing().getCustomization().getTheme() != null) {

                    String color = order.getTicketing().getCustomization().getTheme().getPrimaryColor();

                    System.out.println("color: " + color);
                    // Vérifier si la couleur est null ou vide
                    if (color != null && !color.isEmpty()) {
                        primaryColor = color;
                    }
                }

                try {
                    byte[] pdf = ticketPdfService.generateMultipleTicketsPdf(eventName,customerName,
                            eventDate,tickets, primaryColor,
                            order.getTicketing().getCustomization().getImages().getBanner());

                    emailService.sendTicketsEmail(customer.getEmail(),customerName,eventName,eventDate,order.getStripeSessionId(),tickets.size(), pdf,primaryColor);
                } catch (Exception ex) {
                    ex.printStackTrace();
                    // Tu peux journaliser l'erreur ou la gérer proprement
                }

                return ResponseEntity.ok("success");
            }

            return ResponseEntity.ok("ignored");

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Webhook error: " + e.getMessage());
        }
    }


}
