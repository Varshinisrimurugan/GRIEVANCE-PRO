package com.example.hostelcompilant.service;

import java.util.List;

import com.example.hostelcompilant.dto.CategoryCountDto;
import com.example.hostelcompilant.dto.PriorityCountDto;
import com.example.hostelcompilant.dto.StatusCountDto;
import com.example.hostelcompilant.dto.WorkerReportDto;

public interface ReportService {

    long getTotalComplaints();
    long getPendingComplaints();
    long getInProgressComplaints();
    long getResolvedComplaints();

    List<StatusCountDto> getComplaintCountByStatus();
    List<PriorityCountDto> getComplaintCountByPriority();
    List<CategoryCountDto> getComplaintCountByCategory();

    List<WorkerReportDto> getWorkerPerformanceReport();
}