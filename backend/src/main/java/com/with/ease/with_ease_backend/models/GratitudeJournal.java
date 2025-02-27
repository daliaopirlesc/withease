package com.with.ease.with_ease_backend.models;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "gratitude_journal")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GratitudeJournal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false, length = 1000)
    private String entry;

    @Column(nullable = false)
    private LocalDateTime timestamp;
}
