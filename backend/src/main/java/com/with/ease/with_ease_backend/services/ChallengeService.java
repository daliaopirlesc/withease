package com.with.ease.with_ease_backend.services;

import com.with.ease.with_ease_backend.models.Challenge;
import com.with.ease.with_ease_backend.models.User;
import com.with.ease.with_ease_backend.repositories.ChallengeRepository;
import com.with.ease.with_ease_backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChallengeService {
    private final ChallengeRepository challengeRepository;
    private final UserRepository userRepository;
    private final UserService userService;

    public List<Challenge> getAvailableChallenges(String email, int currentStreak) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return challengeRepository.findByUserAndRequiredStreaksLessThanEqualOrderByRequiredStreaks(user, currentStreak);
    }

    public void markChallengeAsCompleted(Long challengeId) {
        Challenge challenge = challengeRepository.findById(challengeId)
                .orElseThrow(() -> new RuntimeException("Challenge not found"));

        challenge.setCompleted(true);
        challengeRepository.save(challenge);

        userService.updateStreak(challenge.getUser().getId());
    }
}
