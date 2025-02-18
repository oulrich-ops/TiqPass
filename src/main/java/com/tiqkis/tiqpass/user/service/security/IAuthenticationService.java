package com.tiqkis.tiqpass.user.service.security;

import com.tiqkis.tiqpass.common.Config.JwtAuthenticationResponse;
import com.tiqkis.tiqpass.common.Config.SigninRequest;
import com.tiqkis.tiqpass.user.model.User;

public interface IAuthenticationService {
    JwtAuthenticationResponse signup(User request);

    JwtAuthenticationResponse signin(SigninRequest request);
}