package com.with.ease.with_ease_backend.services;

import com.with.ease.with_ease_backend.dto.UserResponse;
import com.with.ease.with_ease_backend.models.Role;
import com.with.ease.with_ease_backend.models.User;
import com.with.ease.with_ease_backend.repositories.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import java.util.stream.Collectors;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    public UserResponse changeUserRole(Long id, String newRole) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));


        if (!newRole.equalsIgnoreCase("USER") && !newRole.equalsIgnoreCase("ADMIN")) {
            throw new RuntimeException("Invalid role: " + newRole);
        }

        user.setRole(Role.valueOf(newRole.toUpperCase()));
        userRepository.save(user);

        return new UserResponse(user.getId(), user.getUsername(), user.getEmail(), user.getRole().name());
    }


    public User createUser(User user) {
        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser.isPresent()) {
            throw new RuntimeException("Email already exists!");
        }
        return userRepository.save(user);
    }

    public List<UserResponse> getAllUsers() {
        return userRepository.findAll().stream()
                .map(user -> new UserResponse(user.getId(), user.getUsername(), user.getEmail(), user.getRole().name()))
                .collect(Collectors.toList());
    }



    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public User updateUser(Long id, User userDetails) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setUsername(userDetails.getUsername());
        user.setEmail(userDetails.getEmail());
        user.setPassword(userDetails.getPassword());

        return userRepository.save(user);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}