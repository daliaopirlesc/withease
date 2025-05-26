package com.with.ease.with_ease_backend.repositories;

import com.with.ease.with_ease_backend.models.MoodLog;
import com.with.ease.with_ease_backend.models.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface MoodLogRepository extends JpaRepository<MoodLog, Long> {
    List<MoodLog> findByUserOrderByTimestampDesc(User user);
    List<MoodLog> findByUserAndTimestampAfter(User user, LocalDateTime timestamp);

    int countByUser(User user);

    @Query("SELECT m.mood FROM MoodLog m WHERE m.user = :user GROUP BY m.mood ORDER BY COUNT(m) DESC")
    List<String> findTopMoodByUser(@Param("user") User user, Pageable pageable);
}


