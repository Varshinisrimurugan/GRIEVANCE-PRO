package com.example.hostelcompilant.dto;

public class FeedbackRequestDto {

    private Long userId;
    private Long compilantId;
    private Integer rating;
    private String comment;

    public FeedbackRequestDto() {
    }

    public Long getUserId() {
        return userId;
    }

    public Long getCompilantId() {
        return compilantId;
    }

    public Integer getRating() {
        return rating;
    }

    public String getComment() {
        return comment;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setCompilantId(Long compilantId) {
        this.compilantId = compilantId;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}