package com.tiqkis.tiqpass.user.service.security.implementation;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tiqkis.tiqpass.common.Config.JwtAuthenticationResponse;
import com.tiqkis.tiqpass.common.Config.SigninRequest;
import com.tiqkis.tiqpass.common.Exceptions.DuplicateUsernameException;
import com.tiqkis.tiqpass.user.repositories.UserRepository;
import com.tiqkis.tiqpass.user.service.security.IJwtService;
import com.tiqkis.tiqpass.user.service.security.IAuthenticationService;
import com.tiqkis.tiqpass.user.model.User;
import com.tiqkis.tiqpass.user.model.Role;
import com.tiqkis.tiqpass.user.model.UserDto;





import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import java.util.Collections;

import static java.rmi.server.LogStream.log;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements IAuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final IJwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Override
    public JwtAuthenticationResponse signup(User newUser) {
        JwtAuthenticationResponse result = new JwtAuthenticationResponse();
//        var user = User.builder().username(request.getUsername())
//                .password(passwordEncoder.encode(request.getPassword()))
//                .role(Role.USER).build();
        newUser.setRoles(Collections.singletonList(Role.USER));
        newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
        try {

            userRepository.save(newUser);
        } catch (DataIntegrityViolationException e) {
            // Assumons que toute DataIntegrityViolationException est due à un nom d'utilisateur en double
            throw new DuplicateUsernameException("Username already exists: " + newUser.getUsername());
        }
        var jwt = jwtService.generateToken(newUser);
        UserDto userDto = new UserDto().UserModelToDto(newUser);
        result.setLogged(true);
        result.setUserDto(userDto);
        result.setToken(jwt);
        return result;
    }

    @Override
    public JwtAuthenticationResponse signin(SigninRequest request) {
        JwtAuthenticationResponse result = new JwtAuthenticationResponse();
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
            var userfound = userRepository.findByUsername(request.getUsername()) .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));
            var jwt = jwtService.generateToken(userfound);
            UserDto user = new UserDto().UserModelToDto(userfound);
            System.out.printf("User found: " + userfound.getUsername());
            result.setLogged(true);
            result.setUserDto(user);
            result.setToken(jwt);
        } catch (Exception e) {
            e.printStackTrace();
            result.setLogged(false);
            result.setUserDto(null);
            result.setToken(null);
        }
        return result;
    }
}