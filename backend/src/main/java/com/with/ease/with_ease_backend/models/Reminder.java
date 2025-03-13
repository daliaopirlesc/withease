package com.with.ease.with_ease_backend.models;

import com.with.ease.with_ease_backend.models.enums.RepeatInterval;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class Reminder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @NotBlank(message = "Message cannot be empty")
    private String message;

    @NotNull(message = "Time cannot be null")
    private LocalDateTime time;

    @Enumerated(EnumType.STRING)
    @NotNull(message = "Repeat interval cannot be null")
    private RepeatInterval repeatInterval;

    private boolean active;
}
