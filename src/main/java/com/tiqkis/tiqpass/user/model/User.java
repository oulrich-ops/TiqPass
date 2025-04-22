package com.tiqkis.tiqpass.user.model;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy= GenerationType.SEQUENCE)
    @Column(nullable=false, updatable=false)
    private Integer id;

    @Column(nullable=false, unique=true)
    private String username;

    @Column(nullable=false)
    private String password;
    private String nomprenom;
    private String adresse;
    private String telephone;
    @Enumerated(EnumType.STRING)
    private Sexe sexe;
    private Date dateNaissance;
    private String identityDoc;



    @Enumerated(EnumType.STRING)
    @ElementCollection(fetch = FetchType.EAGER)  // Permet de stocker une liste d'énumérations
    private List<Role> roles;
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return roles.stream()
                .map(role -> new SimpleGrantedAuthority(role.name()))
                .collect(Collectors.toList());
    }


    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}