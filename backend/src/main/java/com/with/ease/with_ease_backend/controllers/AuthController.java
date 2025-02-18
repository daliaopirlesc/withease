package com.with.ease.with_ease_backend.controllers;

import com.with.ease.with_ease_backend.dto.LoginRequest;
import com.with.ease.with_ease_backend.dto.RegisterRequest;
import com.with.ease.with_ease_backend.services.AuthService;
import com.with.ease.with_ease_backend.repositories.UserRepository;

import com.with.ease.with_ease_backend.models.User;
import com.with.ease.with_ease_backend.models.Role;
import org.springframework.security.crypto.password.PasswordEncoder;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.HashMap;


@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;


    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        if (request.getRole() != null && !request.getRole().isEmpty()) {
            user.setRole(Role.valueOf(request.getRole().toUpperCase()));
        } else {
            user.setRole(Role.USER);
        }

        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully!");
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody LoginRequest request) {
        String token = authService.login(request);
        Map<String, String> response = new HashMap<>();
        response.put("token", token);
        return ResponseEntity.ok(response);
    }

}
