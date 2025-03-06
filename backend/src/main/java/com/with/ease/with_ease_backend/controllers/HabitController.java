package com.with.ease.with_ease_backend.controllers;

import com.with.ease.with_ease_backend.models.Habit;
import com.with.ease.with_ease_backend.services.HabitService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/habits")
@RequiredArgsConstructor
public class HabitController {
    private final HabitService habitService;

    @PostMapping
    public ResponseEntity<String> addHabit(Authentication authentication, @RequestBody Map<String, String> request) {
        String email = ((UserDetails) authentication.getPrincipal()).getUsername();
        habitService.addHabit(email, request.get("name"));
        return ResponseEntity.ok("Habit added successfully");
    }

    @GetMapping
    public ResponseEntity<List<Habit>> getUserHabits(Authentication authentication) {
        String email = ((UserDetails) authentication.getPrincipal()).getUsername();
        return ResponseEntity.ok(habitService.getUserHabits(email));
    }

    @PutMapping("/{id}/complete")
    public ResponseEntity<String> markHabitAsCompleted(@PathVariable Long id) {
        habitService.markHabitAsCompleted(id);
        return ResponseEntity.ok("Habit marked as completed");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteHabit(@PathVariable Long id) {
        habitService.deleteHabit(id);
        return ResponseEntity.ok("Habit deleted successfully");
    }
}
