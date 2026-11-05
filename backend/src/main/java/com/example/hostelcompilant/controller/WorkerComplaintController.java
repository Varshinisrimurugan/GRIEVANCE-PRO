package com.example.hostelcompilant.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.hostelcompilant.dto.UpdateWorkerComplaintStatusDto;
import com.example.hostelcompilant.dto.WorkerComplaintCountDto;
import com.example.hostelcompilant.dto.WorkerComplaintResponseDto;
import com.example.hostelcompilant.service.WorkerComplaintService;

@RestController
@RequestMapping("/worker-complaints")
public class WorkerComplaintController {

    @Autowired
    private WorkerComplaintService workerComplaintService;

    // =========================================================
    // 1. GET ALL COMPLAINTS ASSIGNED TO ONE WORKER
    // URL: GET http://localhost:8081/worker-complaints/worker/2
    // =========================================================
    @GetMapping("/worker/{workerId}")
    public List<WorkerComplaintResponseDto> getComplaintsByWorkerId(@PathVariable Long workerId) {
        return workerComplaintService.getComplaintsByWorkerId(workerId);
    }

    // =========================================================
    // 2. GET ONE COMPLAINT BY ID
    // URL: GET http://localhost:8081/worker-complaints/1
    // =========================================================
    @GetMapping("/{complaintId}")
    public WorkerComplaintResponseDto getComplaintById(@PathVariable Long complaintId) {
        return workerComplaintService.getComplaintById(complaintId);
    }

    // =========================================================
    // 3. FILTER COMPLAINTS BY STATUS FOR ONE WORKER
    // URL: GET http://localhost:8081/worker-complaints/worker/2/status/Resolved
    // URL: GET http://localhost:8081/worker-complaints/worker/2/status/In%20Progress
    // =========================================================
    @GetMapping("/worker/{workerId}/status/{status}")
    public List<WorkerComplaintResponseDto> getComplaintsByWorkerIdAndStatus(
            @PathVariable Long workerId,
            @PathVariable String status) {
        return workerComplaintService.getComplaintsByWorkerIdAndStatus(workerId, status);
    }

    // =========================================================
    // 4. UPDATE COMPLAINT STATUS BY WORKER
    // URL: PUT http://localhost:8081/worker-complaints/1/status
    // BODY:
    // {
    //   "status": "Resolved"
    // }
    // =========================================================
    @PutMapping("/{complaintId}/status")
    public WorkerComplaintResponseDto updateComplaintStatus(
            @PathVariable Long complaintId,
            @RequestBody UpdateWorkerComplaintStatusDto requestDto) {
        return workerComplaintService.updateComplaintStatus(complaintId, requestDto);
    }

    // =========================================================
    // 5. WORKER DASHBOARD COUNTS
    // URL: GET http://localhost:8081/worker-complaints/worker/2/counts
    // =========================================================
    @GetMapping("/worker/{workerId}/counts")
    public WorkerComplaintCountDto getWorkerComplaintCounts(@PathVariable Long workerId) {
        return workerComplaintService.getWorkerComplaintCounts(workerId);
    }
}