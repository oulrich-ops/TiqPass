package com.tiqkis.tiqpass.purchasing.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderDetailsDTO {
    private String id;
    private Double amount;
    private String status;
    private LocalDateTime createdAt;


}