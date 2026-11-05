package com.example.hostelcompilant.dto;

public class WorkerReportDto {

    private Long workerId;
    private String workerName;
    private String specialization;
    private Long totalAssignedComplaints;
    private Long resolvedComplaints;
    private Long pendingOrInProgressComplaints;
    private Double resolutionRate;

    public WorkerReportDto() {
    }

    public WorkerReportDto(Long workerId, String workerName, String specialization,
                           Long totalAssignedComplaints, Long resolvedComplaints,
                           Long pendingOrInProgressComplaints, Double resolutionRate) {
        this.workerId = workerId;
        this.workerName = workerName;
        this.specialization = specialization;
        this.totalAssignedComplaints = totalAssignedComplaints;
        this.resolvedComplaints = resolvedComplaints;
        this.pendingOrInProgressComplaints = pendingOrInProgressComplaints;
        this.resolutionRate = resolutionRate;
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

    public Long getTotalAssignedComplaints() {
        return totalAssignedComplaints;
    }

    public void setTotalAssignedComplaints(Long totalAssignedComplaints) {
        this.totalAssignedComplaints = totalAssignedComplaints;
    }

    public Long getResolvedComplaints() {
        return resolvedComplaints;
    }

    public void setResolvedComplaints(Long resolvedComplaints) {
        this.resolvedComplaints = resolvedComplaints;
    }

    public Long getPendingOrInProgressComplaints() {
        return pendingOrInProgressComplaints;
    }

    public void setPendingOrInProgressComplaints(Long pendingOrInProgressComplaints) {
        this.pendingOrInProgressComplaints = pendingOrInProgressComplaints;
    }

    public Double getResolutionRate() {
        return resolutionRate;
    }

    public void setResolutionRate(Double resolutionRate) {
        this.resolutionRate = resolutionRate;
    }
}