package com.with.ease.with_ease_backend.services;

import com.with.ease.with_ease_backend.models.Meditation;
import com.with.ease.with_ease_backend.models.User;
import com.with.ease.with_ease_backend.repositories.MeditationRepository;
import com.with.ease.with_ease_backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MeditationService {
    private final MeditationRepository meditationRepository;
    private final UserRepository userRepository;
    private final UserService userService;


    public List<Meditation> getUserMeditations(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return meditationRepository.findByUser(user);
    }

    public void addMeditation(String email, String title, String description, int duration) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Meditation meditation = new Meditation();
        meditation.setUser(user);
        meditation.setTitle(title);
        meditation.setDescription(description);
        meditation.setDuration(duration);
        meditation.setCompleted(false);

        meditationRepository.save(meditation);
    }

    public void markMeditationAsCompleted(Long meditationId) {
        Meditation meditation = meditationRepository.findById(meditationId)
                .orElseThrow(() -> new RuntimeException("Meditation not found"));

        meditation.setCompleted(true);
        meditationRepository.save(meditation);

        userService.updateStreak(meditation.getUser().getId());
    }
}
