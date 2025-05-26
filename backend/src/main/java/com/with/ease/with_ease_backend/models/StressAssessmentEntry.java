package com.with.ease.with_ease_backend.models;

import jakarta.persistence.*;

import java.time.LocalDate;
import lombok.Data;

@Data
@Entity

public class StressAssessmentEntry {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int score;

    private LocalDate date;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;


}
