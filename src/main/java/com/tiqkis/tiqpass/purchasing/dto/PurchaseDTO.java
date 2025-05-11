package com.tiqkis.tiqpass.purchasing.dto;


import com.tiqkis.tiqpass.domain.model.Payer;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PurchaseDTO {
    private  int eventId;
    private List<OrderLine> tickets;
    private Payer customer;
    private Double taxe;

    public double getTotalAmount() {
        double totalAmount = 0.0;
        for (OrderLine ticket : tickets) {
            totalAmount += ticket.getPrice()*ticket.getQuantity();
        }

        totalAmount += taxe;
        return totalAmount;
    }
}