package com.with.ease.with_ease_backend.controllers;

import com.with.ease.with_ease_backend.dto.StressJournalResponse;
import com.with.ease.with_ease_backend.models.StressJournal;
import com.with.ease.with_ease_backend.services.StressJournalService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/stress-journal")
@RequiredArgsConstructor
public class StressJournalController {
    private final StressJournalService stressJournalService;

    @PostMapping
    public ResponseEntity<String> addEntry(Authentication authentication, @RequestBody Map<String, String> request) {
        String email = ((UserDetails) authentication.getPrincipal()).getUsername();
        stressJournalService.addEntry(email, request.get("entry"));
        return ResponseEntity.ok("Entry added successfully");
    }

    @GetMapping
    public ResponseEntity<List<StressJournalResponse>> getEntries(Authentication authentication) {
        String email = ((UserDetails) authentication.getPrincipal()).getUsername();
        return ResponseEntity.ok(stressJournalService.getEntries(email));
    }

}
