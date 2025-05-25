package com.with.ease.with_ease_backend.services;

import com.with.ease.with_ease_backend.models.User;
import com.with.ease.with_ease_backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StressAssessmentService {

    private final UserRepository userRepository;

    public void saveStressScore(User user, int score) {
        user.setStressScore(score);
        user.setStressAssessed(true);
        userRepository.save(user);
    }
}
