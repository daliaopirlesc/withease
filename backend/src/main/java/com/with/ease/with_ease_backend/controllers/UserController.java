package com.with.ease.with_ease_backend.controllers;

import com.with.ease.with_ease_backend.dto.UserResponse;
import com.with.ease.with_ease_backend.models.User;
import com.with.ease.with_ease_backend.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PutMapping("/me")
    public ResponseEntity<User> updateUserProfile(@RequestBody User updatedUser, Authentication authentication) {
        String email = ((UserDetails) authentication.getPrincipal()).getUsername();
        User currentUser = userService.getUserByEmail(email);

        currentUser.setName(updatedUser.getName());
        currentUser.setAge(updatedUser.getAge());
        currentUser.setGender(updatedUser.getGender());
        currentUser.setOccupation(updatedUser.getOccupation());
        currentUser.setHealthInfo(updatedUser.getHealthInfo());

        return ResponseEntity.ok(userService.save(currentUser));
    }

    @GetMapping("/me")
    public ResponseEntity<UserResponse> getUserProfile(Authentication authentication) {
        String email = ((UserDetails) authentication.getPrincipal()).getUsername();
        return ResponseEntity.ok(userService.getUserProfile(email));
    }

    @PutMapping("/me/goals")
    public ResponseEntity<String> updateUserGoals(@RequestBody List<String> goals, Authentication authentication) {
        String email = ((UserDetails) authentication.getPrincipal()).getUsername();
        userService.updateUserGoals(email, goals);
        return ResponseEntity.ok("Goals updated successfully.");
    }


    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody Map<String, String> request) {
        return ResponseEntity.ok(userService.resetPassword(request.get("token"), request.get("password")));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody Map<String, String> request) {
        return ResponseEntity.ok("Reset token: " + userService.generateResetToken(request.get("email")));
    }

    @PutMapping("/{id}/role")
    public ResponseEntity<UserResponse> changeUserRole(@PathVariable Long id, @RequestBody Map<String, String> request) {
        return ResponseEntity.ok(userService.changeUserRole(id, request.get("role")));
    }

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        return ResponseEntity.ok(userService.createUser(user));
    }

    @GetMapping
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<UserResponse>> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User userDetails) {
        return ResponseEntity.ok(userService.updateUser(id, userDetails));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok("User deleted successfully");
    }
}
