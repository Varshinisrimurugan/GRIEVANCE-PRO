package com.example.hostelcompilant.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.hostelcompilant.dto.FeedbackRequestDto;
import com.example.hostelcompilant.dto.FeedbackResponseDto;
import com.example.hostelcompilant.service.FeedbackService;

@RestController
@RequestMapping("/feedback")
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    // 1. SUBMIT FEEDBACK

    @PostMapping
    public FeedbackResponseDto createFeedback(@RequestBody FeedbackRequestDto requestDto) {
        return feedbackService.createFeedback(requestDto);
    }

    // 2. GET ALL FEEDBACKS
 
    @GetMapping
    public List<FeedbackResponseDto> getAllFeedbacks() {
        return feedbackService.getAllFeedbacks();
    }

    // 3. GET FEEDBACKS OF ONE USER

    @GetMapping("/user/{userId}")
    public List<FeedbackResponseDto> getFeedbacksByUserId(@PathVariable Long userId) {
        return feedbackService.getFeedbacksByUserId(userId);
    }

    // 4. GET FEEDBACKS OF ONE COMPLAINT
   
    @GetMapping("/compilant/{compilantId}")
    public List<FeedbackResponseDto> getFeedbacksByCompilantId(@PathVariable Long compilantId) {
        return feedbackService.getFeedbacksByCompilantId(compilantId);
    }

    // 5. DELETE FEEDBACK

    @DeleteMapping("/{feedbackId}")
    public String deleteFeedback(@PathVariable Long feedbackId) {
        feedbackService.deleteFeedback(feedbackId);
        return "Feedback deleted successfully";
    }
}