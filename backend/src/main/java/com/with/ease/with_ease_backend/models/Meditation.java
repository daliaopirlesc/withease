package com.with.ease.with_ease_backend.models;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "meditations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Meditation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String title;

    @Column(length = 500)
    private String description;

    @Column(nullable = false)
    private int duration;

    @Column(nullable = false)
    private boolean completed;

    @Column(name = "completion_date")
    private LocalDate completionDate;
}
