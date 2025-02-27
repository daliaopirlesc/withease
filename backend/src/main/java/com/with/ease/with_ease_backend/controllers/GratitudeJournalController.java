package com.with.ease.with_ease_backend.controllers;

import com.with.ease.with_ease_backend.dto.GratitudeJournalResponse;
import com.with.ease.with_ease_backend.models.GratitudeJournal;
import com.with.ease.with_ease_backend.services.GratitudeJournalService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/gratitude-journal")
@RequiredArgsConstructor
public class GratitudeJournalController {
    private final GratitudeJournalService gratitudeJournalService;

    @PostMapping
    public ResponseEntity<String> addEntry(Authentication authentication, @RequestBody Map<String, String> request) {
        String email = ((UserDetails) authentication.getPrincipal()).getUsername();
        gratitudeJournalService.addEntry(email, request.get("entry"));
        return ResponseEntity.ok("Entry added successfully");
    }

    @GetMapping
    public ResponseEntity<List<GratitudeJournalResponse>> getEntries(Authentication authentication) {
        String email = ((UserDetails) authentication.getPrincipal()).getUsername();
        return ResponseEntity.ok(gratitudeJournalService.getEntries(email));
    }

}
