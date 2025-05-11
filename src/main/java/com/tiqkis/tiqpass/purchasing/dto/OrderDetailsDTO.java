package com.tiqkis.tiqpass.purchasing.dto;


import com.tiqkis.tiqpass.domain.purchasing.Order;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderDetailsDTO {
    private String id;
    private String orderNumber;
    private String date;
    private String status;
    private String customerName;
    private String customerEmail;
    private String eventName;
    private String eventDate;
    private String eventTime;
    private String eventLocation;
    private String eventImage; // Optional
    private List<OrderTicketDTO> tickets;
    private double totalAmount;
    private String paymentMethod;

    public static OrderDetailsDTO fromModel(Order order) {
        OrderDetailsDTO dto = new OrderDetailsDTO();
        dto.setId(order.getId().toString());
        dto.setOrderNumber("000" + order.getId().toString().substring(Math.max(order.getId().toString().length() - 5, 0)));
        dto.setDate(order.getCreatedAt().toString());
        dto.setStatus(order.getStatus().name());
        dto.setCustomerName(order.getCustomer().getFirstName() + " " + order.getCustomer().getLastName());
        dto.setCustomerEmail(order.getCustomer().getEmail());
        dto.setEventName(order.getTicketing().getName());
        dto.setEventDate(order.getTicketing().getStartDate().toString());
        dto.setEventTime(order.getTicketing().getStartTime()!=null? order.getTicketing().getStartTime().toString(): "10h00");
        dto.setEventLocation(order.getTicketing().getLocation());
        dto.setEventImage(order.getTicketing().getCustomization() != null && order.getTicketing().getCustomization().getImages() != null? order.getTicketing().getCustomization().getImages().getBanner() : null);
        dto.setTickets(order.getItems().stream()
                .map(item -> new OrderTicketDTO(
                        item.getCategory().getId().toString(),
                        item.getCategory().getName(),
                        item.getQuantity(),
                        item.getUnitPrice()
                ))
                .collect(Collectors.toList()));
        dto.setTotalAmount(order.getTotalAmount());
        dto.setPaymentMethod("Stripe"); // A faire evoluer quand on aura d'autres methodes de paiement
        return dto;
    }


}