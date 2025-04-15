package com.with.ease.with_ease_backend.controllers;

import com.with.ease.with_ease_backend.models.MoodLog;
import com.with.ease.with_ease_backend.services.MoodLogService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/mood-log")
@RequiredArgsConstructor
public class MoodLogController {
    private final MoodLogService moodLogService;

    @PostMapping
    public ResponseEntity<String> logMood(Authentication authentication, @RequestBody Map<String, Object> request) {
        System.out.println("Received mood POST");
        String email = ((UserDetails) authentication.getPrincipal()).getUsername();
        String mood = (String) request.get("mood");
        int stressLevel = (int) request.get("stressLevel");
        String cause = (String) request.get("cause");
        String notes = (String) request.get("notes");
        moodLogService.logMood(email, mood, stressLevel, cause, notes);


        return ResponseEntity.ok("Mood logged successfully");
    }

    @GetMapping
    public ResponseEntity<List<MoodLog>> getMoodHistory(Authentication authentication) {
        String email = ((UserDetails) authentication.getPrincipal()).getUsername();
        return ResponseEntity.ok(moodLogService.getMoodHistory(email));
    }
}
