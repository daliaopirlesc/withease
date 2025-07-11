package com.with.ease.with_ease_backend.controllers;

import com.with.ease.with_ease_backend.dto.UserResponse;
import com.with.ease.with_ease_backend.models.StressAssessmentEntry;
import com.with.ease.with_ease_backend.models.User;
import com.with.ease.with_ease_backend.repositories.StressAssessmentRepository;
import com.with.ease.with_ease_backend.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final StressAssessmentRepository stressAssessmentRepository;

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
    public ResponseEntity<?> createUser(@RequestBody User user) {
        try {
            User created = userService.createUser(user);
            return ResponseEntity.ok(created);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
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

    @GetMapping("/me/stress-level")
    public ResponseEntity<Map<String, Double>> getStressAssessmentLevel(Authentication authentication) {
        String email = ((UserDetails) authentication.getPrincipal()).getUsername();
        User user = userService.getUserByEmail(email);
        Integer score = user.getStressScore() != null ? user.getStressScore() : 0;
        double normalized = Math.min(1.0, score / 20.0);
        return ResponseEntity.ok(Map.of("level", normalized));
    }

    @GetMapping("/me/stress-history")
    public ResponseEntity<List<Map<String, Object>>> getStressHistory(Authentication authentication) {
        String email = ((UserDetails) authentication.getPrincipal()).getUsername();
        User user = userService.getUserByEmail(email);

        List<StressAssessmentEntry> entries = stressAssessmentRepository.findByUserOrderByDateDesc(user);

        List<Map<String, Object>> response = entries.stream()
                .map(entry -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("date", entry.getDate().toString());
                    map.put("score", entry.getScore());
                    return map;
                })
                .toList();

        return ResponseEntity.ok(response);
    }

    @GetMapping("/me/needs-assessment")
    public ResponseEntity<Map<String, Boolean>> needsAssessment(Authentication authentication) {
        String email = ((UserDetails) authentication.getPrincipal()).getUsername();
        User user = userService.getUserByEmail(email);
        boolean needs = !stressAssessmentRepository.existsByUserAndDateAfter(user, LocalDate.now().minusDays(7));
        return ResponseEntity.ok(Map.of("required", needs));
    }

    @GetMapping("/me/progress")
    public ResponseEntity<Map<String, Object>> getProgress(Authentication authentication) {
        String email = ((UserDetails) authentication.getPrincipal()).getUsername();
        User user = userService.getUserByEmail(email);

        Map<String, Object> result = userService.buildUserProgress(user);
        return ResponseEntity.ok(result);
    }

}
