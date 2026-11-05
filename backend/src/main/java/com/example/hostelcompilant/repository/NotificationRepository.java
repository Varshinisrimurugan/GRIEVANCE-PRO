package com.example.hostelcompilant.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.hostelcompilant.entity.Notification;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {

    // GET ALL NOTIFICATIONS OF ONE USER (LATEST FIRST)
    List<Notification> findByUser_IdOrderByCreatedAtDesc(Long userId);

    // COUNT UNREAD NOTIFICATIONS OF ONE USER
    long countByUser_IdAndStatus(Long userId, String status);

    // GET ALL UNREAD NOTIFICATIONS OF ONE USER
    List<Notification> findByUser_IdAndStatus(Long userId, String status);
}