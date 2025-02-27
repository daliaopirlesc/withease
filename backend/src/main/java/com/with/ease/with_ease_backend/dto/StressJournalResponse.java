package com.with.ease.with_ease_backend.dto;

import java.time.LocalDateTime;

public record StressJournalResponse(
        Long id,
        String entry,
        LocalDateTime timestamp
) {}
