package com.with.ease.with_ease_backend.models;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "mood_logs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MoodLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String mood;

    @Column(nullable = false)
    private int stressLevel;

    @Column(nullable = false)
    private String cause;

    @Column(length = 1000)
    private String notes;

    @Column(nullable = false)
    private LocalDateTime timestamp;
}
