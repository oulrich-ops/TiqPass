package com.tiqkis.tiqpass.domain.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Customization {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private ContactInfo contactInfo;

    @Embedded
    private Description description;

    private Theme theme;

    @Embedded
    private Images images;

    private String registrationInfo;
}

