package com.example.hostelcompilant.service;

import java.util.List;

import com.example.hostelcompilant.entity.Compilant;

public interface WorkerDashboardService {

    // Get all complaints assigned to a worker
    List<Compilant> getAssignedComplaints(Long workerId);

    // Dashboard counts
    long getAssignedCount(Long workerId);

    long getPendingCount(Long workerId);

    long getInProgressCount(Long workerId);

    long getResolvedCount(Long workerId);

}