package com.with.ease.with_ease_backend.services;

import com.with.ease.with_ease_backend.models.MoodLog;
import com.with.ease.with_ease_backend.models.User;
import com.with.ease.with_ease_backend.repositories.MoodLogRepository;
import com.with.ease.with_ease_backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MoodLogService {
    private final MoodLogRepository moodLogRepository;
    private final UserRepository userRepository;

    public void logMood(String email, String mood) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        MoodLog moodLog = new MoodLog();
        moodLog.setUser(user);
        moodLog.setMood(mood);
        moodLog.setTimestamp(LocalDateTime.now());

        moodLogRepository.save(moodLog);
    }

    public List<MoodLog> getMoodHistory(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return moodLogRepository.findByUserOrderByTimestampDesc(user);
    }
}
