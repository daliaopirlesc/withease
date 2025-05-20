package com.with.ease.with_ease_backend.controllers;

import com.with.ease.with_ease_backend.dto.MeditationProgressRequest;
import com.with.ease.with_ease_backend.models.User;
import com.with.ease.with_ease_backend.repositories.UserRepository;
import com.with.ease.with_ease_backend.services.MeditationProgressService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/meditation-progress")
@RequiredArgsConstructor
public class MeditationProgressController {

    private final MeditationProgressService progressService;
    private final UserRepository userRepository;

    @PostMapping
    public ResponseEntity<String> saveProgress(@RequestBody MeditationProgressRequest request, Authentication authentication) {
        String email = ((UserDetails) authentication.getPrincipal()).getUsername();
        User user = userRepository.findByEmail(email).orElseThrow();
        progressService.saveProgress(user, request);
        return ResponseEntity.ok("Meditation progress saved.");
    }
}
