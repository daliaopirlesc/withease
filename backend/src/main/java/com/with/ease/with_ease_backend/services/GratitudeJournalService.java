package com.with.ease.with_ease_backend.services;

import com.with.ease.with_ease_backend.dto.GratitudeJournalResponse;
import com.with.ease.with_ease_backend.models.GratitudeJournal;
import com.with.ease.with_ease_backend.models.User;
import com.with.ease.with_ease_backend.repositories.GratitudeJournalRepository;
import com.with.ease.with_ease_backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GratitudeJournalService {
    private final GratitudeJournalRepository gratitudeJournalRepository;
    private final UserRepository userRepository;

    public void addEntry(String email, String entry) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        GratitudeJournal journalEntry = new GratitudeJournal();
        journalEntry.setUser(user);
        journalEntry.setEntry(entry);
        journalEntry.setTimestamp(LocalDateTime.now());

        gratitudeJournalRepository.save(journalEntry);
    }

    public List<GratitudeJournalResponse> getEntries(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return gratitudeJournalRepository.findByUserOrderByTimestampDesc(user)
                .stream()
                .map(entry -> new GratitudeJournalResponse(entry.getId(), entry.getEntry(), entry.getTimestamp()))
                .toList();
    }

}
