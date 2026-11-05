package com.example.hostelcompilant.serviceImplementation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.hostelcompilant.entity.Compilant;
import com.example.hostelcompilant.repository.CompilantRepository;
import com.example.hostelcompilant.service.WorkerDashboardService;

@Service
public class WorkerDashboardServiceImplementation implements WorkerDashboardService {

    @Autowired
    private CompilantRepository compilantRepository;

    // ==========================================
    // GET ASSIGNED COMPLAINTS
    // ==========================================

    @Override
    public List<Compilant> getAssignedComplaints(Long workerId) {
        return compilantRepository.findByWorker_Id(workerId);
    }

    // ==========================================
    // TOTAL ASSIGNED
    // ==========================================

    @Override
    public long getAssignedCount(Long workerId) {
        return compilantRepository.countByWorker_Id(workerId);
    }

    // ==========================================
    // PENDING
    // ==========================================

    @Override
    public long getPendingCount(Long workerId) {
        return compilantRepository.countByWorker_IdAndStatus(workerId, "PENDING");
    }

    // ==========================================
    // IN PROGRESS
    // ==========================================

    @Override
    public long getInProgressCount(Long workerId) {
        return compilantRepository.countByWorker_IdAndStatus(workerId, "IN_PROGRESS");
    }

    // ==========================================
    // RESOLVED
    // ==========================================

    @Override
    public long getResolvedCount(Long workerId) {
        return compilantRepository.countByWorker_IdAndStatus(workerId, "RESOLVED");
    }

}