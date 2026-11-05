package com.example.hostelcompilant.serviceImplementation;

import org.springframework.stereotype.Service;

import com.example.hostelcompilant.repository.CompilantRepository;
import com.example.hostelcompilant.service.DashboardService;

@Service
public class DashboardServiceImplementation implements DashboardService {

    private final CompilantRepository compilantRepository;

    public DashboardServiceImplementation(CompilantRepository compilantRepository) {
        this.compilantRepository = compilantRepository;
    }

    @Override
    public long getTotalComplaints() {
        return compilantRepository.count();
    }

    @Override
    public long getPendingComplaints() {
        return compilantRepository.countByStatus("PENDING");
    }

    @Override
    public long getInProgressComplaints() {
        return compilantRepository.countByStatus("IN_PROGRESS");
    }

    @Override
    public long getResolvedComplaints() {
        return compilantRepository.countByStatus("RESOLVED");
    }
}