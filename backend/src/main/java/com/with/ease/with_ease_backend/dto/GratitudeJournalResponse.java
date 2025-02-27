package com.with.ease.with_ease_backend.dto;

import java.time.LocalDateTime;

public record GratitudeJournalResponse(
        Long id,
        String entry,
        LocalDateTime timestamp
) {}
