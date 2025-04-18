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

    @Embedded
    private ContactInfo contactInfo;

    @Embedded
    private Description description;

    @Embedded
    private Theme theme;

    @Embedded
    private Images images;

    private String registrationInfo;
}

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
class ContactInfo {
    private String organizerName;
    private String phone;
    private String email;
}

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
class Description {
    private String shortDescription;
    private String longDescription;
}

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
class Theme {
    private String primaryColor;
}

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
class Images {
    private String banner; // Store file paths or URLs
    private String thumbnail; // Store file paths or URLs
}