package com.with.ease.with_ease_backend.services;

import com.with.ease.with_ease_backend.models.Challenge;

import com.with.ease.with_ease_backend.models.Habit;
import com.with.ease.with_ease_backend.models.User;
import com.with.ease.with_ease_backend.repositories.ChallengeRepository;
import com.with.ease.with_ease_backend.repositories.HabitRepository;
import com.with.ease.with_ease_backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class InsightService {
    private final ChallengeRepository challengeRepository;

    private final HabitRepository habitRepository;
    private final UserRepository userRepository;

    public Map<String, Object> getUserInsights(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Challenge> completedChallenges = challengeRepository.findByUserAndCompleted(user, true);

        List<Habit> completedHabits = habitRepository.findByUserAndCompleted(user, true);

        int currentStreak = calculateCurrentStreak(user);
        int bestStreak = calculateBestStreak(user);

        Map<String, Object> insights = new HashMap<>();
        insights.put("completedChallenges", completedChallenges.size());

        insights.put("completedHabits", completedHabits.size());
        insights.put("currentStreak", currentStreak);
        insights.put("bestStreak", bestStreak);

        return insights;
    }

    private int calculateCurrentStreak(User user) {
        LocalDate today = LocalDate.now();
        int streak = 0;
        while (activityLoggedOnDate(user, today.minusDays(streak))) {
            streak++;
        }
        return streak;
    }

    private int calculateBestStreak(User user) {
        LocalDate today = LocalDate.now();
        int maxStreak = 0;
        int currentStreak = 0;

        for (int i = 0; i < 100; i++) {
            if (activityLoggedOnDate(user, today.minusDays(i))) {
                currentStreak++;
                maxStreak = Math.max(maxStreak, currentStreak);
            } else {
                currentStreak = 0;
            }
        }
        return maxStreak;
    }

    private boolean activityLoggedOnDate(User user, LocalDate date) {
        return !challengeRepository.findByUserAndCompletionDate(user, date).isEmpty()

                || !habitRepository.findByUserAndCompletionDate(user, date).isEmpty();
    }
}
