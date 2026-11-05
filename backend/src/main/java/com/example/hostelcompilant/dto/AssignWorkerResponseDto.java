package com.example.hostelcompilant.dto;

import java.time.LocalDateTime;

public class AssignWorkerResponseDto {

    private Long assignId;
    private Long compilantId;
    private String compilantTitle;
    private String status;
    private Long workerId;
    private String workerName;
    private String specialization;
    private LocalDateTime assignedAt;

    public AssignWorkerResponseDto() {
    }

    public Long getAssignId() {
        return assignId;
    }

    public void setAssignId(Long assignId) {
        this.assignId = assignId;
    }

    public Long getCompilantId() {
        return compilantId;
    }

    public void setCompilantId(Long compilantId) {
        this.compilantId = compilantId;
    }

    public String getCompilantTitle() {
        return compilantTitle;
    }

    public void setCompilantTitle(String compilantTitle) {
        this.compilantTitle = compilantTitle;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
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

    public String getSpecialization() {
        return specialization;
    }

    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }

    public LocalDateTime getAssignedAt() {
        return assignedAt;
    }

    public void setAssignedAt(LocalDateTime assignedAt) {
        this.assignedAt = assignedAt;
    }
}