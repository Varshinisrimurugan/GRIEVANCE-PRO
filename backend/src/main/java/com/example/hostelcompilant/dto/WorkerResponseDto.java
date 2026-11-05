package com.example.hostelcompilant.dto;

public class WorkerResponseDto {

    private Long worker_id;
    private String worker_name;
    private String specialization;
    private String email;
    private String phone_number;
    private long assigned_compilants_count;

    // Worker Availability
    private String workerStatus;

    // Current Active Complaints
    private Integer activeComplaints;

    // Existing fields
    private String name;
    private Boolean status;

    public WorkerResponseDto() {
    }

    public WorkerResponseDto(
            Long worker_id,
            String worker_name,
            String specialization,
            String email,
            String phone_number,
            long assigned_compilants_count,
            String workerStatus,
            Integer activeComplaints,
            String name,
            Boolean status) {

        this.worker_id = worker_id;
        this.worker_name = worker_name;
        this.specialization = specialization;
        this.email = email;
        this.phone_number = phone_number;
        this.assigned_compilants_count = assigned_compilants_count;
        this.workerStatus = workerStatus;
        this.activeComplaints = activeComplaints;
        this.name = name;
        this.status = status;
    }

    public Long getWorker_id() {
        return worker_id;
    }

    public void setWorker_id(Long worker_id) {
        this.worker_id = worker_id;
    }

    public String getWorker_name() {
        return worker_name;
    }

    public void setWorker_name(String worker_name) {
        this.worker_name = worker_name;
    }

    public String getSpecialization() {
        return specialization;
    }

    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone_number() {
        return phone_number;
    }

    public void setPhone_number(String phone_number) {
        this.phone_number = phone_number;
    }

    public long getAssigned_compilants_count() {
        return assigned_compilants_count;
    }

    public void setAssigned_compilants_count(long assigned_compilants_count) {
        this.assigned_compilants_count = assigned_compilants_count;
    }

    public String getWorkerStatus() {
        return workerStatus;
    }

    public void setWorkerStatus(String workerStatus) {
        this.workerStatus = workerStatus;
    }

    public Integer getActiveComplaints() {
        return activeComplaints;
    }

    public void setActiveComplaints(Integer activeComplaints) {
        this.activeComplaints = activeComplaints;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

}