package com.example.hostelcompilant.dto;

import java.time.LocalDateTime;

public class FeedbackResponseDto {

    private Long feedbackId;
    private Integer rating;
    private String comment;
    private LocalDateTime createdAt;

    private Long userId;
    private String userName;

    private Long compilantId;
    private String compilantCode;
    private String compilantTitle;
    private String compilantStatus;

    public FeedbackResponseDto() {
    }

    public FeedbackResponseDto(Long feedbackId, Integer rating, String comment, LocalDateTime createdAt,
                               Long userId, String userName,
                               Long compilantId, String compilantCode, String compilantTitle, String compilantStatus) {
        this.feedbackId = feedbackId;
        this.rating = rating;
        this.comment = comment;
        this.createdAt = createdAt;
        this.userId = userId;
        this.userName = userName;
        this.compilantId = compilantId;
        this.compilantCode = compilantCode;
        this.compilantTitle = compilantTitle;
        this.compilantStatus = compilantStatus;
    }

    public Long getFeedbackId() {
        return feedbackId;
    }

    public Integer getRating() {
        return rating;
    }

    public String getComment() {
        return comment;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public Long getUserId() {
        return userId;
    }

    public String getUserName() {
        return userName;
    }

    public Long getCompilantId() {
        return compilantId;
    }

    public String getCompilantCode() {
        return compilantCode;
    }

    public String getCompilantTitle() {
        return compilantTitle;
    }

    public String getCompilantStatus() {
        return compilantStatus;
    }

    public void setFeedbackId(Long feedbackId) {
        this.feedbackId = feedbackId;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void setCompilantId(Long compilantId) {
        this.compilantId = compilantId;
    }

    public void setCompilantCode(String compilantCode) {
        this.compilantCode = compilantCode;
    }

    public void setCompilantTitle(String compilantTitle) {
        this.compilantTitle = compilantTitle;
    }

    public void setCompilantStatus(String compilantStatus) {
        this.compilantStatus = compilantStatus;
    }
}