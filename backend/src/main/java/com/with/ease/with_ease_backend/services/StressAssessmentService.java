package com.with.ease.with_ease_backend.services;

import com.with.ease.with_ease_backend.models.StressAssessmentEntry;
import com.with.ease.with_ease_backend.models.User;
import com.with.ease.with_ease_backend.repositories.StressAssessmentRepository;
import com.with.ease.with_ease_backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class StressAssessmentService {

    private final UserRepository userRepository;
    private final StressAssessmentRepository stressAssessmentRepository;

    public void saveStressScore(User user, int score) {
        user.setStressScore(score);
        user.setStressAssessed(true);
        userRepository.save(user);

        StressAssessmentEntry entry = new StressAssessmentEntry();
        entry.setUser(user);
        entry.setScore(score);
        entry.setDate(LocalDate.now());

        stressAssessmentRepository.save(entry);
    }
}
