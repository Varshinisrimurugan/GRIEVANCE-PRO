package com.example.hostelcompilant.serviceImplementation;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.hostelcompilant.dto.CategoryCountDto;
import com.example.hostelcompilant.dto.PriorityCountDto;
import com.example.hostelcompilant.dto.StatusCountDto;
import com.example.hostelcompilant.dto.WorkerReportDto;
import com.example.hostelcompilant.repository.CompilantRepository;
import com.example.hostelcompilant.repository.WorkerRepository;
import com.example.hostelcompilant.service.ReportService;

@Service
public class ReportServiceImplementation implements ReportService {

    @Autowired
    private CompilantRepository compilantRepository;

    @Autowired
    private WorkerRepository workerRepository;

    @Override
    public long getTotalComplaints() {
        return compilantRepository.count();
    }

    @Override
    public long getPendingComplaints() {
        return compilantRepository.countByStatus("Pending");
    }

    @Override
    public long getInProgressComplaints() {
        return compilantRepository.countByStatus("In Progress");
    }

    @Override
    public long getResolvedComplaints() {
        return compilantRepository.countByStatus("Resolved");
    }

    @Override
    public List<StatusCountDto> getComplaintCountByStatus() {
        List<Object[]> results = compilantRepository.getComplaintCountByStatus();
        List<StatusCountDto> response = new ArrayList<>();

        for (Object[] row : results) {
            String status = row[0] != null ? row[0].toString() : "";
            Long count = row[1] != null ? ((Number) row[1]).longValue() : 0L;

            response.add(new StatusCountDto(status, count));
        }

        return response;
    }

    @Override
    public List<PriorityCountDto> getComplaintCountByPriority() {
        List<Object[]> results = compilantRepository.getComplaintCountByPriority();
        List<PriorityCountDto> response = new ArrayList<>();

        for (Object[] row : results) {
            String priority = row[0] != null ? row[0].toString() : "";
            Long count = row[1] != null ? ((Number) row[1]).longValue() : 0L;

            response.add(new PriorityCountDto(priority, count));
        }

        return response;
    }

    @Override
    public List<CategoryCountDto> getComplaintCountByCategory() {
        List<Object[]> results = compilantRepository.getComplaintCountByCategory();
        List<CategoryCountDto> response = new ArrayList<>();

        for (Object[] row : results) {
            String category = row[0] != null ? row[0].toString() : "";
            Long count = row[1] != null ? ((Number) row[1]).longValue() : 0L;

            response.add(new CategoryCountDto(category, count));
        }

        return response;
    }

    @Override
    public List<WorkerReportDto> getWorkerPerformanceReport() {
        List<Object[]> results = workerRepository.getWorkerPerformanceReport();
        List<WorkerReportDto> response = new ArrayList<>();

        for (Object[] row : results) {
            Long workerId = row[0] != null ? ((Number) row[0]).longValue() : 0L;
            String workerName = row[1] != null ? row[1].toString() : "";
            String specialization = row[2] != null ? row[2].toString() : "";
            Long totalAssignedComplaints = row[3] != null ? ((Number) row[3]).longValue() : 0L;
            Long resolvedComplaints = row[4] != null ? ((Number) row[4]).longValue() : 0L;
            Long pendingOrInProgressComplaints = row[5] != null ? ((Number) row[5]).longValue() : 0L;

            Double resolutionRate = 0.0;
            if (totalAssignedComplaints > 0) {
                resolutionRate = (resolvedComplaints * 100.0) / totalAssignedComplaints;
            }

            WorkerReportDto dto = new WorkerReportDto();
            dto.setWorkerId(workerId);
            dto.setWorkerName(workerName);
            dto.setSpecialization(specialization);
            dto.setTotalAssignedComplaints(totalAssignedComplaints);
            dto.setResolvedComplaints(resolvedComplaints);
            dto.setPendingOrInProgressComplaints(pendingOrInProgressComplaints);
            dto.setResolutionRate(resolutionRate);

            response.add(dto);
        }

        return response;
    }
}