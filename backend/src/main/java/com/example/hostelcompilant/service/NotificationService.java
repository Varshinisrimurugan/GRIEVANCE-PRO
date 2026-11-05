package com.example.hostelcompilant.service;

import java.util.List;

import com.example.hostelcompilant.entity.Notification;

public interface NotificationService {

    // CREATE NOTIFICATION
    Notification createNotification(Notification notification);

    // GET ALL NOTIFICATIONS OF ONE USER
    List<Notification> getNotificationsByUserId(Long userId);

    // GET UNREAD COUNT OF ONE USER
    long getUnreadNotificationCount(Long userId);

    // MARK ONE NOTIFICATION AS READ
    Notification markNotificationAsRead(Long notificationId);

    // MARK ALL NOTIFICATIONS AS READ
    void markAllNotificationsAsRead(Long userId);

    // DELETE NOTIFICATION
    void deleteNotification(Long notificationId);
}