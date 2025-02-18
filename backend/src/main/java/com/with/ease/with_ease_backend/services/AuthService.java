package com.with.ease.with_ease_backend.services;

import com.with.ease.with_ease_backend.dto.LoginRequest;
import com.with.ease.with_ease_backend.dto.RegisterRequest;
import com.with.ease.with_ease_backend.models.Role;
import com.with.ease.with_ease_backend.models.User;
import com.with.ease.with_ease_backend.repositories.UserRepository;
import com.with.ease.with_ease_backend.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    public String register(RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already in use");
        }

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
        return jwtUtil.generateToken(user.getEmail());
    }


    public String login(LoginRequest request) {
        Optional<User> userOptional = userRepository.findByEmail(request.getEmail());
        if (userOptional.isEmpty()) {
            throw new RuntimeException("Invalid credentials");
        }

        User user = userOptional.get();
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        return jwtUtil.generateToken(user.getEmail());
    }
}
