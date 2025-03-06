package com.with.ease.with_ease_backend.controllers;

import com.with.ease.with_ease_backend.models.Challenge;
import com.with.ease.with_ease_backend.services.ChallengeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/challenges")
@RequiredArgsConstructor
public class ChallengeController {
    private final ChallengeService challengeService;

    @GetMapping
    public ResponseEntity<List<Challenge>> getAvailableChallenges(Authentication authentication, @RequestParam int streaks) {
        String email = ((UserDetails) authentication.getPrincipal()).getUsername();
        return ResponseEntity.ok(challengeService.getAvailableChallenges(email, streaks));
    }

    @PutMapping("/{id}/complete")
    public ResponseEntity<String> markChallengeAsCompleted(@PathVariable Long id) {
        challengeService.markChallengeAsCompleted(id);
        return ResponseEntity.ok("Challenge marked as completed");
    }
}
