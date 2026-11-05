package com.example.hostelcompilant.dto;

import java.time.LocalDateTime;

public class WorkerComplaintResponseDto {

    private Long complaintId;
    private String compilantCode;
    private String category;
    private String issueType;
    private String compilantTitle;
    private String description;
    private String blockName;
    private String floorNumber;
    private String roomNumber;
    private String location;
    private String priority;
    private String status;
    private String photoUrl;
    private LocalDateTime createdAt;

    private Long studentId;
    private String studentName;
    private String studentEmail;
    private String studentPhoneNumber;

    public WorkerComplaintResponseDto() {
    }

    public WorkerComplaintResponseDto(Long complaintId, String compilantCode, String category, String issueType,
                                      String compilantTitle, String description, String blockName, String floorNumber,
                                      String roomNumber, String location, String priority, String status,
                                      String photoUrl, LocalDateTime createdAt, Long studentId, String studentName,
                                      String studentEmail, String studentPhoneNumber) {
        this.complaintId = complaintId;
        this.compilantCode = compilantCode;
        this.category = category;
        this.issueType = issueType;
        this.compilantTitle = compilantTitle;
        this.description = description;
        this.blockName = blockName;
        this.floorNumber = floorNumber;
        this.roomNumber = roomNumber;
        this.location = location;
        this.priority = priority;
        this.status = status;
        this.photoUrl = photoUrl;
        this.createdAt = createdAt;
        this.studentId = studentId;
        this.studentName = studentName;
        this.studentEmail = studentEmail;
        this.studentPhoneNumber = studentPhoneNumber;
    }

    public Long getComplaintId() {
        return complaintId;
    }

    public void setComplaintId(Long complaintId) {
        this.complaintId = complaintId;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getBlockName() {
        return blockName;
    }

    public void setBlockName(String blockName) {
        this.blockName = blockName;
    }

    public String getFloorNumber() {
        return floorNumber;
    }

    public void setFloorNumber(String floorNumber) {
        this.floorNumber = floorNumber;
    }

    public String getRoomNumber() {
        return roomNumber;
    }

    public void setRoomNumber(String roomNumber) {
        this.roomNumber = roomNumber;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
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

    public Long getStudentId() {
        return studentId;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
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

    public String getStudentPhoneNumber() {
        return studentPhoneNumber;
    }

    public void setStudentPhoneNumber(String studentPhoneNumber) {
        this.studentPhoneNumber = studentPhoneNumber;
    }
}