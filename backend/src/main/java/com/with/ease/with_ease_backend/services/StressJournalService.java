package com.with.ease.with_ease_backend.services;

import com.with.ease.with_ease_backend.dto.StressJournalResponse;
import com.with.ease.with_ease_backend.models.StressJournal;
import com.with.ease.with_ease_backend.models.User;
import com.with.ease.with_ease_backend.repositories.StressJournalRepository;
import com.with.ease.with_ease_backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class StressJournalService {
    private final StressJournalRepository stressJournalRepository;
    private final UserRepository userRepository;
    private final UserService userService;


    private final List<String> negativeKeywords = List.of(
            "anxious", "panic", "tired", "exhausted", "overwhelmed",
            "nervous", "angry", "sad", "depressed", "stressed"
    );

    public void addEntry(String email, String entry) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        StressJournal journalEntry = new StressJournal();
        journalEntry.setUser(user);
        journalEntry.setEntry(entry);
        journalEntry.setTimestamp(LocalDateTime.now());

        stressJournalRepository.save(journalEntry);
        userService.updateStreak(user.getId());
    }

    public List<StressJournalResponse> getEntries(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return stressJournalRepository.findByUserOrderByTimestampDesc(user)
                .stream()
                .map(entry -> new StressJournalResponse(entry.getId(), entry.getEntry(), entry.getTimestamp()))
                .toList();
    }

    public double calculateStressLevel(User user) {
        LocalDateTime oneWeekAgo = LocalDateTime.now().minusDays(7);
        List<StressJournal> entries = stressJournalRepository.findByUserAndTimestampAfter(user, oneWeekAgo);

        if (entries.isEmpty()) return 0.0;

        double totalScore = 0.0;

        for (StressJournal entry : entries) {
            String text = entry.getEntry().toLowerCase();
            long negativeCount = negativeKeywords.stream().filter(text::contains).count();
            double entryScore = 0.2 + (negativeCount * 0.1);
            totalScore += Math.min(entryScore, 1.0);
        }

        double avgScore = totalScore / entries.size();
        return Math.min(avgScore, 1.0);
    }
}
