package com.tiqkis.tiqpass.purchasing.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderTicketDTO {
    private String ticketId;
    private String category;
    private int quantity;
    private double unitPrice;
}