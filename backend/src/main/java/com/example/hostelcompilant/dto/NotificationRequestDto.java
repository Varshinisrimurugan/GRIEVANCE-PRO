package com.example.hostelcompilant.dto;

public class NotificationRequestDto {

    private Long userId;
    private String message;
    private String status;

    public NotificationRequestDto() {
    }

    public NotificationRequestDto(Long userId, String message, String status) {
        this.userId = userId;
        this.message = message;
        this.status = status;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}