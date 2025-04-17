package com.tiqkis.tiqpass.user.controller;


import com.tiqkis.tiqpass.common.ApiResponse;
import com.tiqkis.tiqpass.common.Config.SigninRequest;
import com.tiqkis.tiqpass.common.Exceptions.DuplicateUsernameException;
import com.tiqkis.tiqpass.common.interfaces.ApiResponseUtil;
import com.tiqkis.tiqpass.user.api.AuthenticationApi;
import com.tiqkis.tiqpass.user.model.User;
import com.tiqkis.tiqpass.user.service.IUserService;
import com.tiqkis.tiqpass.user.service.security.IAuthenticationService;
import com.tiqkis.tiqpass.common.Config.JwtAuthenticationResponse;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@RestController
@RequiredArgsConstructor
public class AuthenticationController implements AuthenticationApi {

    private static final Logger log = LoggerFactory.getLogger(AuthenticationController.class);
    private final IAuthenticationService authenticationService;
    private final HttpSession httpSession;
    private final IUserService iUserService;


    @Override
    public ResponseEntity<ApiResponse<JwtAuthenticationResponse>> register(User request) {

        try {
            JwtAuthenticationResponse result = authenticationService.signup(request);
            ApiResponse<JwtAuthenticationResponse> response = ApiResponseUtil.buildApiResponse("user :: register", result, HttpStatus.OK.value());
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (DuplicateUsernameException e) {
            ApiResponse<JwtAuthenticationResponse> response = ApiResponseUtil.buildApiResponse(e.getMessage(), HttpStatus.BAD_REQUEST.value());
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseEntity<ApiResponse<JwtAuthenticationResponse>> authenticate(SigninRequest request) {
        JwtAuthenticationResponse result = null;
        try {
            result = authenticationService.signin(request);
        }catch (Exception e) {
            e.printStackTrace();
            result.setLogged(false);
        }
        if(result == null || !result.isLogged()) {
            ApiResponse<JwtAuthenticationResponse> response = ApiResponseUtil.buildApiResponse("login :: error", HttpStatus.UNAUTHORIZED.value());
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }
        ApiResponse<JwtAuthenticationResponse> response = ApiResponseUtil.buildApiResponse("login :: response",result,HttpStatus.OK.value());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Void> logout() {
        httpSession.invalidate();
        return new ResponseEntity<>(HttpStatus.OK);
    }


}
