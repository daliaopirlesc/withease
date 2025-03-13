package com.with.ease.with_ease_backend.repositories;

import com.with.ease.with_ease_backend.models.Reminder;
import com.with.ease.with_ease_backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface ReminderRepository extends JpaRepository<Reminder, Long> {
    List<Reminder> findByUser(User user);
    List<Reminder> findByActiveTrueAndTimeBefore(LocalDateTime now);
}
