package com.with.ease.with_ease_backend.services;

import com.with.ease.with_ease_backend.models.Reminder;
import com.with.ease.with_ease_backend.models.User;
import com.with.ease.with_ease_backend.repositories.ReminderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ReminderService {
    private final ReminderRepository reminderRepository;
    private final UserService userService;


    public Reminder completeReminder(Long id) {
        return reminderRepository.findById(id).map(reminder -> {
            reminder.setActive(false);
            return reminderRepository.save(reminder);
        }).orElseThrow(() -> new RuntimeException("Reminder not found with ID: " + id));
    }


    public Reminder getReminderById(Long id) {
        return reminderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reminder not found with ID: " + id));
    }



    public Reminder createReminder(Reminder reminder) {
        Reminder saved = reminderRepository.save(reminder);
        userService.updateStreak(reminder.getUser().getId());
        return saved;
    }


    public List<Reminder> getUserReminders(User user) {
        return reminderRepository.findByUser(user);
    }

    public Optional<Reminder> updateReminder(Long id, Reminder newDetails) {
        return reminderRepository.findById(id).map(reminder -> {
            reminder.setMessage(newDetails.getMessage());
            reminder.setTime(newDetails.getTime());
            reminder.setRepeatInterval(newDetails.getRepeatInterval());
            reminder.setActive(newDetails.isActive());
            return reminderRepository.save(reminder);
        });
    }

    public void deleteReminder(Long id) {
        reminderRepository.deleteById(id);
    }


    @Scheduled(fixedRate = 60000)
    public void sendNotifications() {
        List<Reminder> dueReminders = reminderRepository.findByActiveTrueAndTimeBefore(LocalDateTime.now());
        for (Reminder reminder : dueReminders) {

            System.out.println("Sending notification: " + reminder.getMessage());


            if ("DAILY".equals(reminder.getRepeatInterval())) {
                reminder.setTime(reminder.getTime().plusDays(1));
            } else if ("WEEKLY".equals(reminder.getRepeatInterval())) {
                reminder.setTime(reminder.getTime().plusWeeks(1));
            } else {
                reminder.setActive(false);
            }
            reminderRepository.save(reminder);
        }
    }
}
