package com.example.hostelcompilant.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.hostelcompilant.entity.Feedback;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Long> {

    // ONE USER -> MANY FEEDBACKS
    List<Feedback> findByUser_IdOrderByCreatedAtDesc(Long userId);

    // ONE COMPLAINT -> MANY FEEDBACKS
    List<Feedback> findByCompilant_IdOrderByCreatedAtDesc(Long compilantId);
}
