package com.example.hostelcompilant.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.hostelcompilant.dto.CategoryCountDto;
import com.example.hostelcompilant.dto.PriorityCountDto;
import com.example.hostelcompilant.dto.StatusCountDto;
import com.example.hostelcompilant.dto.WorkerReportDto;
import com.example.hostelcompilant.service.ReportService;

@RestController
@RequestMapping("/reports")
public class ReportController {

    @Autowired
    private ReportService reportService;

    
    // 1. TOP CARD COUNTS
    
    // TOTAL COMPLAINTS
    @GetMapping("/total")
    public long getTotalComplaints() {
        return reportService.getTotalComplaints();
    }

    // PENDING COMPLAINTS
    @GetMapping("/pending")
    public long getPendingComplaints() {
        return reportService.getPendingComplaints();
    }

    // IN PROGRESS COMPLAINTS
    @GetMapping("/inprogress")
    public long getInProgressComplaints() {
        return reportService.getInProgressComplaints();
    }

    // RESOLVED COMPLAINTS
    @GetMapping("/resolved")
    public long getResolvedComplaints() {
        return reportService.getResolvedComplaints();
    }

  
    // 2. REPORT CHART DATA

    // COMPLAINT COUNT BY STATUS
    @GetMapping("/status")
    public List<StatusCountDto> getComplaintCountByStatus() {
        return reportService.getComplaintCountByStatus();
    }

    // COMPLAINT COUNT BY PRIORITY
    @GetMapping("/priority")
    public List<PriorityCountDto> getComplaintCountByPriority() {
        return reportService.getComplaintCountByPriority();
    }

    // COMPLAINT COUNT BY CATEGORY
    @GetMapping("/category")
    public List<CategoryCountDto> getComplaintCountByCategory() {
        return reportService.getComplaintCountByCategory();
    }

    
    // 3. WORKER PERFORMANCE REPORT
  
    @GetMapping("/worker-performance")
    public List<WorkerReportDto> getWorkerPerformanceReport() {
        return reportService.getWorkerPerformanceReport();
    }
}