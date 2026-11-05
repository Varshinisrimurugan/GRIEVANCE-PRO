package com.example.hostelcompilant.serviceImplementation;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.hostelcompilant.dto.FeedbackRequestDto;
import com.example.hostelcompilant.dto.FeedbackResponseDto;
import com.example.hostelcompilant.entity.Compilant;
import com.example.hostelcompilant.entity.Feedback;
import com.example.hostelcompilant.entity.User;
import com.example.hostelcompilant.repository.CompilantRepository;
import com.example.hostelcompilant.repository.FeedbackRepository;
import com.example.hostelcompilant.repository.UserRepository;
import com.example.hostelcompilant.service.FeedbackService;

@Service
public class FeedbackServiceImplementation implements FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CompilantRepository compilantRepository;

    // ==========================================
    // ENTITY -> DTO
    // ==========================================
    private FeedbackResponseDto convertToDto(Feedback feedback) {

        Long userId = null;
        String userName = null;

        Long compilantId = null;
        String compilantCode = null;
        String compilantTitle = null;
        String compilantStatus = null;

        if (feedback.getUser() != null) {
            userId = feedback.getUser().getId();
            userName = feedback.getUser().getName();
        }

        if (feedback.getCompilant() != null) {
            compilantId = feedback.getCompilant().getId();
            compilantCode = feedback.getCompilant().getCompilantCode();
            compilantTitle = feedback.getCompilant().getCompilantTitle();
            compilantStatus = feedback.getCompilant().getStatus();
        }

        return new FeedbackResponseDto(
                feedback.getId(),
                feedback.getRating(),
                feedback.getComment(),
                feedback.getCreatedAt(),
                userId,
                userName,
                compilantId,
                compilantCode,
                compilantTitle,
                compilantStatus
        );
    }

    // ==========================================
    // 1. CREATE FEEDBACK
    // ==========================================
    @Override
    public FeedbackResponseDto createFeedback(FeedbackRequestDto requestDto) {

        // 1. Validate request
        if (requestDto.getUserId() == null) {
            throw new RuntimeException("User id is required");
        }

        if (requestDto.getCompilantId() == null) {
            throw new RuntimeException("Complaint id is required");
        }

        if (requestDto.getRating() == null) {
            throw new RuntimeException("Rating is required");
        }

        if (requestDto.getRating() < 1 || requestDto.getRating() > 5) {
            throw new RuntimeException("Rating must be between 1 and 5");
        }

        // 2. Check user
        User user = userRepository.findById(requestDto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found with id: " + requestDto.getUserId()));

        // 3. Check complaint
        Compilant compilant = compilantRepository.findById(requestDto.getCompilantId())
                .orElseThrow(() -> new RuntimeException("Compilant not found with id: " + requestDto.getCompilantId()));

        // 4. Feedback allowed only if complaint is RESOLVED
        String status = compilant.getStatus();

        if (status == null || !status.equalsIgnoreCase("RESOLVED")) {
            throw new RuntimeException("Feedback can be given only for RESOLVED complaints");
        }

        // 5. Optional but important:
        // make sure same user gives feedback only for their own complaint
        if (compilant.getUser() == null || !compilant.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("You can give feedback only for your own complaint");
        }

        // 6. Prevent duplicate feedback for same complaint by same user
        List<Feedback> existingFeedbacks = feedbackRepository.findByUser_IdOrderByCreatedAtDesc(user.getId());

        boolean alreadyGiven = existingFeedbacks.stream()
                .anyMatch(f -> f.getCompilant() != null
                        && f.getCompilant().getId().equals(compilant.getId()));

        if (alreadyGiven) {
            throw new RuntimeException("Feedback already submitted for this complaint");
        }

        // 7. Save feedback
        Feedback feedback = new Feedback();
        feedback.setUser(user);
        feedback.setCompilant(compilant);
        feedback.setRating(requestDto.getRating());
        feedback.setComment(requestDto.getComment());
        feedback.setCreatedAt(LocalDateTime.now());

        Feedback savedFeedback = feedbackRepository.save(feedback);

        return convertToDto(savedFeedback);
    }

    // ==========================================
    // 2. GET ALL FEEDBACKS
    // ==========================================
    @Override
    public List<FeedbackResponseDto> getAllFeedbacks() {
        return feedbackRepository.findAll()
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    // ==========================================
    // 3. GET FEEDBACKS OF ONE USER
    // ==========================================
    @Override
    public List<FeedbackResponseDto> getFeedbacksByUserId(Long userId) {
        return feedbackRepository.findByUser_IdOrderByCreatedAtDesc(userId)
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    // ==========================================
    // 4. GET FEEDBACKS OF ONE COMPLAINT
    // ==========================================
    @Override
    public List<FeedbackResponseDto> getFeedbacksByCompilantId(Long compilantId) {
        return feedbackRepository.findByCompilant_IdOrderByCreatedAtDesc(compilantId)
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    // ==========================================
    // 5. DELETE FEEDBACK
    // ==========================================
    @Override
    public void deleteFeedback(Long feedbackId) {
        if (!feedbackRepository.existsById(feedbackId)) {
            throw new RuntimeException("Feedback not found with id: " + feedbackId);
        }

        feedbackRepository.deleteById(feedbackId);
    }
}