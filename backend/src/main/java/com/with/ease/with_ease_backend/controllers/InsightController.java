package com.with.ease.with_ease_backend.controllers;

import com.with.ease.with_ease_backend.models.MoodLog;
import com.with.ease.with_ease_backend.models.StressJournal;
import com.with.ease.with_ease_backend.models.User;
import com.with.ease.with_ease_backend.repositories.MoodLogRepository;
import com.with.ease.with_ease_backend.repositories.StressJournalRepository;
import com.with.ease.with_ease_backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/insights")
@RequiredArgsConstructor
public class InsightController {
    private final UserRepository userRepository;
    private final MoodLogRepository moodLogRepository;
    private final StressJournalRepository stressJournalRepository;

    @GetMapping
    public ResponseEntity<Map<String, String>> getUserInsights(Authentication authentication) {
        String email = ((UserDetails) authentication.getPrincipal()).getUsername();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        LocalDateTime sevenDaysAgo = LocalDateTime.now().minusDays(7);
        List<MoodLog> moods = moodLogRepository.findByUserAndTimestampAfter(user, sevenDaysAgo);
        List<StressJournal> stress = stressJournalRepository.findByUserAndTimestampAfter(user, sevenDaysAgo);

        if (moods.isEmpty() && stress.isEmpty()) {
            return ResponseEntity.ok(Map.of("insight", "Not enough data to generate insights."));
        }

        Map<String, Map<String, Long>> moodCausePairs = new HashMap<>();
        for (MoodLog log : moods) {
            String mood = log.getMood();
            String cause = log.getCause();
            moodCausePairs
                    .computeIfAbsent(mood, k -> new HashMap<>())
                    .merge(cause, 1L, Long::sum);
        }

        String topMood = "N/A";
        String topCause = "N/A";
        long maxCount = 0;

        for (var moodEntry : moodCausePairs.entrySet()) {
            for (var causeEntry : moodEntry.getValue().entrySet()) {
                if (causeEntry.getValue() > maxCount) {
                    maxCount = causeEntry.getValue();
                    topMood = moodEntry.getKey();
                    topCause = causeEntry.getKey();
                }
            }
        }

        double stressMoodAvg = moods.stream()
                .mapToDouble(MoodLog::getStressLevel)
                .average().orElse(0);

        double stressJournalAvg = stress.isEmpty() ? 0.5 : 1.0;
        double combined = (stressMoodAvg / 10 + stressJournalAvg) / 2;
        String stressText = combined < 0.3 ? "low" : combined < 0.7 ? "moderate" : "high";

        String insightText = String.format(
                "In the past week, your most frequent mood was %s, typically caused by %s. Your overall stress level has been %s.",
                topMood, topCause, stressText
        );

        return ResponseEntity.ok(Map.of("insight", insightText));
    }
}
