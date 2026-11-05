package com.example.hostelcompilant.service;

import java.util.List;

import com.example.hostelcompilant.dto.UpdateWorkerComplaintStatusDto;
import com.example.hostelcompilant.dto.WorkerComplaintCountDto;
import com.example.hostelcompilant.dto.WorkerComplaintResponseDto;

public interface WorkerComplaintService {

    // 1. GET ALL COMPLAINTS ASSIGNED TO ONE WORKER
    List<WorkerComplaintResponseDto> getComplaintsByWorkerId(Long workerId);

    // 2. GET ONE COMPLAINT BY ID
    WorkerComplaintResponseDto getComplaintById(Long complaintId);

    // 3. FILTER WORKER COMPLAINTS BY STATUS
    List<WorkerComplaintResponseDto> getComplaintsByWorkerIdAndStatus(Long workerId, String status);

    // 4. UPDATE COMPLAINT STATUS BY WORKER
    WorkerComplaintResponseDto updateComplaintStatus(Long complaintId, UpdateWorkerComplaintStatusDto requestDto);

    // 5. WORKER DASHBOARD COUNTS
    WorkerComplaintCountDto getWorkerComplaintCounts(Long workerId);
}