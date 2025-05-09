package com.tiqkis.tiqpass.domain.model;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// Payer (for different billing person)
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Payer {
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

}
