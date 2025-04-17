package com.tiqkis.tiqpass.domain.model;

import com.tiqkis.tiqpass.user.model.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

// Participant
@Entity
@NoArgsConstructor
@AllArgsConstructor

public class Promoter extends User {

private String identityDoc;
}
