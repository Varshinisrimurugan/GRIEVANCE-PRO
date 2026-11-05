package com.example.hostelcompilant.service;

import java.util.List;

import com.example.hostelcompilant.dto.FeedbackRequestDto;
import com.example.hostelcompilant.dto.FeedbackResponseDto;

public interface FeedbackService {

    // 1. SUBMIT FEEDBACK
    FeedbackResponseDto createFeedback(FeedbackRequestDto requestDto);

    // 2. GET ALL FEEDBACKS
    List<FeedbackResponseDto> getAllFeedbacks();

    // 3. GET FEEDBACKS OF ONE USER
    List<FeedbackResponseDto> getFeedbacksByUserId(Long userId);

    // 4. GET FEEDBACKS OF ONE COMPLAINT
    List<FeedbackResponseDto> getFeedbacksByCompilantId(Long compilantId);

    // 5. DELETE FEEDBACK
    void deleteFeedback(Long feedbackId);
}