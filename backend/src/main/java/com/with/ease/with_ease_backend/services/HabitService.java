package com.with.ease.with_ease_backend.services;

import com.with.ease.with_ease_backend.models.Habit;
import com.with.ease.with_ease_backend.models.User;
import com.with.ease.with_ease_backend.repositories.HabitRepository;
import com.with.ease.with_ease_backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class HabitService {
    private final HabitRepository habitRepository;
    private final UserRepository userRepository;

    public void addHabit(String email, String name) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Habit habit = new Habit();
        habit.setUser(user);
        habit.setName(name);
        habit.setStartDate(LocalDate.now());
        habit.setCompleted(false);

        habitRepository.save(habit);
    }

    public List<Habit> getUserHabits(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return habitRepository.findByUserOrderByStartDateDesc(user);
    }

    public void markHabitAsCompleted(Long habitId) {
        Habit habit = habitRepository.findById(habitId)
                .orElseThrow(() -> new RuntimeException("Habit not found"));

        habit.setCompleted(true);
        habitRepository.save(habit);
    }

    public void deleteHabit(Long habitId) {
        habitRepository.deleteById(habitId);
    }
}
