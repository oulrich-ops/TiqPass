package com.tiqkis.tiqpass.purchasing.api;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.stripe.exception.StripeException;
import com.tiqkis.tiqpass.common.ApiResponse;
import com.tiqkis.tiqpass.purchasing.dto.PurchaseDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(value = "*")
@RequestMapping("/payment")
public interface PaymentApi {
    @PostMapping("/create-checkout-session")
    ResponseEntity<ApiResponse<Map<String, String>>> createSession(@RequestBody PurchaseDTO purchase) throws StripeException, JsonProcessingException;

    @PostMapping("/stripe/webhook")
    ResponseEntity<String> handleStripeWebhook(@RequestBody String payload, @RequestHeader("Stripe-Signature") String sigHeader);


}
