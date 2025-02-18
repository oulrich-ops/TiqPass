package com.tiqkis.tiqpass.common.Config;

import com.tiqkis.tiqpass.user.model.UserDto;
import lombok.*;


@NoArgsConstructor
@AllArgsConstructor @Getter
@Setter
public class JwtAuthenticationResponse {
    private String token;
    private boolean isLogged;
    private UserDto userDto;
}