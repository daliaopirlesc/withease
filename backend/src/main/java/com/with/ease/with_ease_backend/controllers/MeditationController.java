package com.with.ease.with_ease_backend.controllers;

import com.with.ease.with_ease_backend.models.Meditation;
import com.with.ease.with_ease_backend.services.MeditationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/meditations")
@RequiredArgsConstructor
public class MeditationController {
    private final MeditationService meditationService;

    @GetMapping
    public ResponseEntity<List<Meditation>> getUserMeditations(Authentication authentication) {
        String email = ((UserDetails) authentication.getPrincipal()).getUsername();
        return ResponseEntity.ok(meditationService.getUserMeditations(email));
    }

    @PostMapping
    public ResponseEntity<String> addMeditation(Authentication authentication, @RequestBody Map<String, Object> request) {
        String email = ((UserDetails) authentication.getPrincipal()).getUsername();
        String title = (String) request.get("title");
        String description = (String) request.get("description");
        int duration = (int) request.get("duration");

        meditationService.addMeditation(email, title, description, duration);
        return ResponseEntity.ok("Meditation session added successfully");
    }

    @PutMapping("/{id}/complete")
    public ResponseEntity<String> markMeditationAsCompleted(@PathVariable Long id) {
        meditationService.markMeditationAsCompleted(id);
        return ResponseEntity.ok("Meditation session marked as completed");
    }
}
