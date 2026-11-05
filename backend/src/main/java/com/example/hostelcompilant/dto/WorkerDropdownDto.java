package com.example.hostelcompilant.dto;

public class WorkerDropdownDto {

    private Long id;
    private String workerName;

    public WorkerDropdownDto() {
    }

    public WorkerDropdownDto(Long id, String workerName) {
        this.id = id;
        this.workerName = workerName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getWorkerName() {
        return workerName;
    }

    public void setWorkerName(String workerName) {
        this.workerName = workerName;
    }
}