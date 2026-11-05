package com.example.hostelcompilant.service;

public interface DashboardService {

    long getTotalComplaints();

    long getPendingComplaints();

    long getInProgressComplaints();

    long getResolvedComplaints();
}