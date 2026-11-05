package com.example.hostelcompilant.dto;

import java.time.LocalDateTime;

public class CompilantResponseDto {

    private Long complaintId;
    private String category;
    private String issueType;
    private String blockName;
    private String floorNumber;
    private String roomNumber;
    private String description;
    private String priority;
    private String status;
    private String photoUrl;
    private LocalDateTime createdAt;
    private Long userId;

    public CompilantResponseDto() {
    }

    public CompilantResponseDto(Long complaintId, String category, String issueType,
                                String blockName, String floorNumber, String roomNumber,
                                String description, String priority, String status,
                                String photoUrl, LocalDateTime createdAt, Long userId) {
        this.complaintId = complaintId;
        this.category = category;
        this.issueType = issueType;
        this.blockName = blockName;
        this.floorNumber = floorNumber;
        this.roomNumber = roomNumber;
        this.description = description;
        this.priority = priority;
        this.status = status;
        this.photoUrl = photoUrl;
        this.createdAt = createdAt;
        this.userId = userId;
    }

    public Long getComplaintId() {
        return complaintId;
    }

    public void setComplaintId(Long complaintId) {
        this.complaintId = complaintId;
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
}