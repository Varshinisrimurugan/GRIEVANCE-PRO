package com.example.hostelcompilant.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.hostelcompilant.service.DashboardService;

@RestController
@RequestMapping("/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/total")
    public long getTotalComplaints() {
        return dashboardService.getTotalComplaints();
    }

    @GetMapping("/pending")
    public long getPendingComplaints() {
        return dashboardService.getPendingComplaints();
    }

    @GetMapping("/in-progress")
    public long getInProgressComplaints() {
        return dashboardService.getInProgressComplaints();
    }

    @GetMapping("/resolved")
    public long getResolvedComplaints() {
        return dashboardService.getResolvedComplaints();
    }
}