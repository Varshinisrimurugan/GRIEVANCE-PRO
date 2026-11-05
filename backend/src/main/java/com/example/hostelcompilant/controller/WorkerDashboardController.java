package com.example.hostelcompilant.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.hostelcompilant.entity.Compilant;
import com.example.hostelcompilant.service.WorkerDashboardService;

@RestController
@RequestMapping("/worker")
@CrossOrigin(origins = "*")
public class WorkerDashboardController {

    @Autowired
    private WorkerDashboardService workerDashboardService;

    // ==========================================
    // GET ALL ASSIGNED COMPLAINTS
    // GET: /worker/{workerId}/complaints
    // ==========================================
    @GetMapping("/{workerId}/complaints")
    public List<Compilant> getAssignedComplaints(@PathVariable Long workerId) {
        return workerDashboardService.getAssignedComplaints(workerId);
    }

    // ==========================================
    // TOTAL ASSIGNED COUNT
    // GET: /worker/{workerId}/assigned/count
    // ==========================================
    @GetMapping("/{workerId}/assigned/count")
    public long getAssignedCount(@PathVariable Long workerId) {
        return workerDashboardService.getAssignedCount(workerId);
    }

    // ==========================================
    // PENDING COUNT
    // GET: /worker/{workerId}/pending/count
    // ==========================================
    @GetMapping("/{workerId}/pending/count")
    public long getPendingCount(@PathVariable Long workerId) {
        return workerDashboardService.getPendingCount(workerId);
    }

    // ==========================================
    // IN PROGRESS COUNT
    // GET: /worker/{workerId}/inprogress/count
    // ==========================================
    @GetMapping("/{workerId}/inprogress/count")
    public long getInProgressCount(@PathVariable Long workerId) {
        return workerDashboardService.getInProgressCount(workerId);
    }

    // ==========================================
    // RESOLVED COUNT
    // GET: /worker/{workerId}/resolved/count
    // ==========================================
    @GetMapping("/{workerId}/resolved/count")
    public long getResolvedCount(@PathVariable Long workerId) {
        return workerDashboardService.getResolvedCount(workerId);
    }
}