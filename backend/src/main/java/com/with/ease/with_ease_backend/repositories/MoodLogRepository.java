package com.with.ease.with_ease_backend.repositories;

import com.with.ease.with_ease_backend.models.MoodLog;
import com.with.ease.with_ease_backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MoodLogRepository extends JpaRepository<MoodLog, Long> {
    List<MoodLog> findByUserOrderByTimestampDesc(User user);
}
