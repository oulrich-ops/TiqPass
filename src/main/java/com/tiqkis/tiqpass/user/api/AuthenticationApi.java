package com.tiqkis.tiqpass.user.api;

import com.tiqkis.tiqpass.common.ApiResponse;
import com.tiqkis.tiqpass.common.Config.JwtAuthenticationResponse;
import com.tiqkis.tiqpass.common.Config.SigninRequest;
import com.tiqkis.tiqpass.user.model.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@CrossOrigin(value = "*")
@RequestMapping("/auth")
public interface AuthenticationApi {

    @PostMapping("/signup")
    ResponseEntity<ApiResponse<JwtAuthenticationResponse>> register(@RequestBody User request);

    @PostMapping("/login")
    ResponseEntity<ApiResponse<JwtAuthenticationResponse>> authenticate(@RequestBody SigninRequest request);

    @PostMapping("/logout")
    ResponseEntity<Void> logout();

}
