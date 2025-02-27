package com.with.ease.with_ease_backend.services;

import com.with.ease.with_ease_backend.dto.StressJournalResponse;
import com.with.ease.with_ease_backend.models.StressJournal;
import com.with.ease.with_ease_backend.models.User;
import com.with.ease.with_ease_backend.repositories.StressJournalRepository;
import com.with.ease.with_ease_backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class StressJournalService {
    private final StressJournalRepository stressJournalRepository;
    private final UserRepository userRepository;

    public void addEntry(String email, String entry) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        StressJournal journalEntry = new StressJournal();
        journalEntry.setUser(user);
        journalEntry.setEntry(entry);
        journalEntry.setTimestamp(LocalDateTime.now());

        stressJournalRepository.save(journalEntry);
    }

    public List<StressJournalResponse> getEntries(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return stressJournalRepository.findByUserOrderByTimestampDesc(user)
                .stream()
                .map(entry -> new StressJournalResponse(entry.getId(), entry.getEntry(), entry.getTimestamp()))
                .toList();
    }

}
