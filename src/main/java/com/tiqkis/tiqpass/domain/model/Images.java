package com.tiqkis.tiqpass.domain.model;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Images {
    private String banner; // Store file paths or URLs
    private String thumbnail; // Store file paths or URLs
}
