package com.with.ease.with_ease_backend.repositories;

import com.with.ease.with_ease_backend.models.Habit;
import com.with.ease.with_ease_backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface HabitRepository extends JpaRepository<Habit, Long> {
    List<Habit> findByUserOrderByStartDateDesc(User user);
    List<Habit> findByUserAndCompleted(User user, boolean completed);
    List<Habit> findByUserAndCompletionDate(User user, LocalDate completionDate);


}
