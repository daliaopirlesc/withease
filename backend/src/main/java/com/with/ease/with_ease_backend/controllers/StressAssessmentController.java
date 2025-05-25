package com.with.ease.with_ease_backend.controllers;

import com.with.ease.with_ease_backend.dto.StressRequest;
import com.with.ease.with_ease_backend.models.User;
import com.with.ease.with_ease_backend.services.StressAssessmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/stress-assessment")
@RequiredArgsConstructor
public class StressAssessmentController {

    private final StressAssessmentService stressAssessmentService;

    @PostMapping
    public ResponseEntity<?> submitStressScore(@RequestBody StressRequest request, @AuthenticationPrincipal User user) {
        stressAssessmentService.saveStressScore(user, request.getScore());
        return ResponseEntity.ok().build();
    }
}
