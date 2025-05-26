package com.with.ease.with_ease_backend.controllers;

import com.with.ease.with_ease_backend.dto.StressRequest;
import com.with.ease.with_ease_backend.models.User;
import com.with.ease.with_ease_backend.services.StressAssessmentService;
import com.with.ease.with_ease_backend.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/stress-assessment")
@RequiredArgsConstructor
public class StressAssessmentController {

    private final StressAssessmentService stressAssessmentService;
    private final UserService userService;

    @PostMapping
    public ResponseEntity<?> submitStressScore(@RequestBody StressRequest request, Authentication authentication) {
        String email = ((UserDetails) authentication.getPrincipal()).getUsername();
        User user = userService.getUserByEmail(email);
        stressAssessmentService.saveStressScore(user, request.getScore());
        return ResponseEntity.ok().build();
    }
}
