package com.with.ease.with_ease_backend.services;

import com.with.ease.with_ease_backend.dto.UserResponse;
import com.with.ease.with_ease_backend.models.Role;
import com.with.ease.with_ease_backend.models.User;
import com.with.ease.with_ease_backend.models.PasswordResetToken;
import com.with.ease.with_ease_backend.repositories.UserRepository;
import com.with.ease.with_ease_backend.repositories.PasswordResetTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.time.LocalDateTime;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor


public class UserService {
    private final UserRepository userRepository;
    private final PasswordResetTokenRepository passwordResetTokenRepository;
    private final PasswordEncoder passwordEncoder;

    public User save(User user) {
        return userRepository.save(user);
    }


    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));
    }

    public UserResponse getUserProfile(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return new UserResponse(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getRole().name(),
                user.getName(),
                user.getAge(),
                user.getGender(),
                user.getOccupation(),
                user.getHealthInfo(),
                user.getGoals().stream().toList()
        );

    }

    public UserResponse changeUserRole(Long id, String newRole) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!newRole.equalsIgnoreCase("USER") && !newRole.equalsIgnoreCase("ADMIN")) {
            throw new RuntimeException("Invalid role: " + newRole);
        }

        user.setRole(Role.valueOf(newRole.toUpperCase()));
        userRepository.save(user);

        return new UserResponse(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getRole().name(),
                user.getName(),
                user.getAge(),
                user.getGender(),
                user.getOccupation(),
                user.getHealthInfo(),
                user.getGoals().stream().toList()
        );

    }


    public User createUser(User user) {
        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser.isPresent()) {
            throw new RuntimeException("Email already exists!");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }


    public List<UserResponse> getAllUsers() {
        return userRepository.findAll().stream()
                .map(user -> new UserResponse(user.getId(),
                        user.getUsername(),
                        user.getEmail(),
                        user.getRole().name(),
                        user.getName(),
                        user.getAge(),
                        user.getGender(),
                        user.getOccupation(),
                        user.getHealthInfo(),
                        user.getGoals().stream().toList()))
                .collect(Collectors.toList());
    }


    public Optional<UserResponse> getUserById(Long id) {
        return userRepository.findById(id)
                .map(user -> new UserResponse(user.getId(),
                        user.getUsername(),
                        user.getEmail(),
                        user.getRole().name(),
                        user.getName(),
                        user.getAge(),
                        user.getGender(),
                        user.getOccupation(),
                        user.getHealthInfo(),
                        user.getGoals().stream().toList()));
    }


    public User updateUser(Long id, User userDetails) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setUsername(userDetails.getUsername());
        user.setEmail(userDetails.getEmail());
        user.setPassword(passwordEncoder.encode(userDetails.getPassword()));

        return userRepository.save(user);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }


    public String generateResetToken(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));


        passwordResetTokenRepository.deleteByUser(user);


        String token = UUID.randomUUID().toString();
        PasswordResetToken resetToken = new PasswordResetToken();
        resetToken.setToken(token);
        resetToken.setUser(user);
        resetToken.setExpiryDate(LocalDateTime.now().plusHours(1));

        passwordResetTokenRepository.save(resetToken);

        return token;
    }

    public String resetPassword(String token, String newPassword) {
        PasswordResetToken resetToken = passwordResetTokenRepository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid or expired token"));

        User user = resetToken.getUser();
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);


        passwordResetTokenRepository.delete(resetToken);

        return "Password reset successfully!";
    }

    public void updateUserGoals(String email, List<String> goals) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setGoals(goals);
        userRepository.save(user);
    }

}
