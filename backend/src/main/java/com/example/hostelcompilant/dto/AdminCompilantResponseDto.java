package com.example.hostelcompilant.dto;

import java.time.LocalDateTime;

public class AdminCompilantResponseDto {

    private Long id;
    private String compilantCode;
    private String category;
    private String issueType;
    private String compilantTitle;
    private String location;
    private String description;
    private String priority;
    private String status;
    private String photoUrl;
    private LocalDateTime createdAt;

    private Long userId;
    private String studentName;
    private String studentEmail;
    private String roomNumber;

    private Long workerId;
    private String workerName;
    private String workerSpecialization;

    public AdminCompilantResponseDto() {
    }

    public AdminCompilantResponseDto(Long id, String compilantCode, String category, String issueType,
            String compilantTitle, String location, String description, String priority, String status,
            String photoUrl, LocalDateTime createdAt, Long userId, String studentName, String studentEmail,
            String roomNumber, Long workerId, String workerName, String workerSpecialization) {
        this.id = id;
        this.compilantCode = compilantCode;
        this.category = category;
        this.issueType = issueType;
        this.compilantTitle = compilantTitle;
        this.location = location;
        this.description = description;
        this.priority = priority;
        this.status = status;
        this.photoUrl = photoUrl;
        this.createdAt = createdAt;
        this.userId = userId;
        this.studentName = studentName;
        this.studentEmail = studentEmail;
        this.roomNumber = roomNumber;
        this.workerId = workerId;
        this.workerName = workerName;
        this.workerSpecialization = workerSpecialization;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCompilantCode() {
        return compilantCode;
    }

    public void setCompilantCode(String compilantCode) {
        this.compilantCode = compilantCode;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getIssueType() {
        return issueType;
    }

    public void setIssueType(String issueType) {
        this.issueType = issueType;
    }

    public String getCompilantTitle() {
        return compilantTitle;
    }

    public void setCompilantTitle(String compilantTitle) {
        this.compilantTitle = compilantTitle;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getPhotoUrl() {
        return photoUrl;
    }

    public void setPhotoUrl(String photoUrl) {
        this.photoUrl = photoUrl;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public String getStudentEmail() {
        return studentEmail;
    }

    public void setStudentEmail(String studentEmail) {
        this.studentEmail = studentEmail;
    }

    public String getRoomNumber() {
        return roomNumber;
    }

    public void setRoomNumber(String roomNumber) {
        this.roomNumber = roomNumber;
    }

    public Long getWorkerId() {
        return workerId;
    }

    public void setWorkerId(Long workerId) {
        this.workerId = workerId;
    }

    public String getWorkerName() {
        return workerName;
    }

    public void setWorkerName(String workerName) {
        this.workerName = workerName;
    }

    public String getWorkerSpecialization() {
        return workerSpecialization;
    }

    public void setWorkerSpecialization(String workerSpecialization) {
        this.workerSpecialization = workerSpecialization;
    }
}