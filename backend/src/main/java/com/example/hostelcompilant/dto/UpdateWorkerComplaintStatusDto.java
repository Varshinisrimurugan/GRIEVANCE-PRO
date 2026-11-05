package com.example.hostelcompilant.dto;

public class UpdateWorkerComplaintStatusDto {

    private String status;

    public UpdateWorkerComplaintStatusDto() {
    }

    public UpdateWorkerComplaintStatusDto(String status) {
        this.status = status;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}