package com.example.hostelcompilant.serviceImplementation;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.hostelcompilant.entity.Notification;
import com.example.hostelcompilant.repository.NotificationRepository;
import com.example.hostelcompilant.service.NotificationService;

@Service
public class NotificationServiceImplementation implements NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    // ==========================================
    // 1. CREATE NOTIFICATION
    // ==========================================
    @Override
    public Notification createNotification(Notification notification) {
        notification.setCreatedAt(LocalDateTime.now());

        if (notification.getStatus() == null || notification.getStatus().isEmpty()) {
            notification.setStatus("UNREAD");
        }

        return notificationRepository.save(notification);
    }

    // ==========================================
    // 2. GET ALL NOTIFICATIONS OF ONE USER
    // ==========================================
    @Override
    public List<Notification> getNotificationsByUserId(Long userId) {
        return notificationRepository.findByUser_IdOrderByCreatedAtDesc(userId);
    }

    // ==========================================
    // 3. GET UNREAD COUNT OF ONE USER
    // ==========================================
    @Override
    public long getUnreadNotificationCount(Long userId) {
        return notificationRepository.countByUser_IdAndStatus(userId, "UNREAD");
    }

    // ==========================================
    // 4. MARK ONE NOTIFICATION AS READ
    // ==========================================
    @Override
    public Notification markNotificationAsRead(Long notificationId) {
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new RuntimeException("Notification not found with id: " + notificationId));

        notification.setStatus("READ");
        return notificationRepository.save(notification);
    }

    // ==========================================
    // 5. MARK ALL NOTIFICATIONS AS READ
    // ==========================================
    @Override
    public void markAllNotificationsAsRead(Long userId) {
        List<Notification> unreadNotifications =
                notificationRepository.findByUser_IdAndStatus(userId, "UNREAD");

        for (Notification notification : unreadNotifications) {
            notification.setStatus("READ");
        }

        notificationRepository.saveAll(unreadNotifications);
    }

    // ==========================================
    // 6. DELETE NOTIFICATION
    // ==========================================
    @Override
    public void deleteNotification(Long notificationId) {
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new RuntimeException("Notification not found with id: " + notificationId));

        notificationRepository.delete(notification);
    }
}