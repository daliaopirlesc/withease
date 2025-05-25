package com.with.ease.with_ease_backend.services;

import com.with.ease.with_ease_backend.dto.MeditationProgressRequest;
import com.with.ease.with_ease_backend.models.MeditationProgress;
import com.with.ease.with_ease_backend.models.User;
import com.with.ease.with_ease_backend.repositories.MeditationProgressRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class MeditationProgressService {

    private final MeditationProgressRepository progressRepository;
    private final UserService userService;

    public void saveProgress(User user, MeditationProgressRequest request) {
        MeditationProgress progress = new MeditationProgress();
        progress.setUser(user);
        progress.setMeditationTitle(request.getMeditationTitle());
        progress.setDuration(request.getDuration());
        progress.setCompletedAt(LocalDateTime.now());
        progressRepository.save(progress);

        userService.updateStreak(user.getId());
    }
}
