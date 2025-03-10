package com.with.ease.with_ease_backend.controllers;

import com.with.ease.with_ease_backend.services.InsightService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/insights")
@RequiredArgsConstructor
public class InsightController {
    private final InsightService insightService;

    @GetMapping
    public ResponseEntity<Map<String, Object>> getUserInsights(Authentication authentication) {
        String email = ((UserDetails) authentication.getPrincipal()).getUsername();
        return ResponseEntity.ok(insightService.getUserInsights(email));
    }
}
