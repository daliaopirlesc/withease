package com.with.ease.with_ease_backend.models;

import jakarta.persistence.*;
import lombok.*;


import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Challenge {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private String title;
    private String description;
    private boolean completed;

    @Column(name = "completion_date")
    private LocalDate completionDate;

    @Column(name = "required_streaks")
    private int requiredStreaks;
}

