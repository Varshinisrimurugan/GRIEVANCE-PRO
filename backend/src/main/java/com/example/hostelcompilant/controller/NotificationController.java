package com.example.hostelcompilant.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.hostelcompilant.entity.Notification;
import com.example.hostelcompilant.service.NotificationService;

@RestController
@RequestMapping("/notifications")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    // CREATE NOTIFICATION
    @PostMapping
    public Notification createNotification(@RequestBody Notification notification) {
        return notificationService.createNotification(notification);
    }

    // GET ALL NOTIFICATIONS OF ONE USER
    @GetMapping("/user/{userId}")
    public List<Notification> getNotificationsByUser(@PathVariable Long userId) {
        return notificationService.getNotificationsByUserId(userId);
    }

    // GET UNREAD COUNT OF ONE USER
    @GetMapping("/user/{userId}/unread-count")
    public long getUnreadCount(@PathVariable Long userId) {
        return notificationService.getUnreadNotificationCount(userId);
    }

    // MARK ONE NOTIFICATION AS READ
    @PatchMapping("/{id}/read")
    public Notification markNotificationAsRead(@PathVariable Long id) {
        return notificationService.markNotificationAsRead(id);
    }

    // MARK ALL NOTIFICATIONS AS READ
    @PatchMapping("/user/{userId}/read-all")
    public String markAllNotificationsAsRead(@PathVariable Long userId) {
        notificationService.markAllNotificationsAsRead(userId);
        return "All notifications marked as READ successfully";
    }

    // DELETE NOTIFICATION
    @DeleteMapping("/{id}")
    public String deleteNotification(@PathVariable Long id) {
        notificationService.deleteNotification(id);
        return "Notification deleted successfully";
    }
}