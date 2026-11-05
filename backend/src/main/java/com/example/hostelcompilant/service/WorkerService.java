package com.example.hostelcompilant.service;

import java.util.List;

import org.springframework.data.domain.Page;

import com.example.hostelcompilant.dto.WorkerDropdownDto;
import com.example.hostelcompilant.dto.WorkerResponseDto;
import com.example.hostelcompilant.dto.WorkerrequestDto;
import com.example.hostelcompilant.entity.Worker;

public interface WorkerService {

    /* ==========================================
       1. CREATE WORKER
    ========================================== */

    Worker createWorker(WorkerrequestDto workerrequestDto);

    /* ==========================================
       2. GET ALL WORKERS
    ========================================== */

    List<WorkerResponseDto> getAllWorkers();

    /* ==========================================
       3. GET ALL WORKERS WITH PAGINATION
    ========================================== */

    Page<WorkerResponseDto> getAllWorkersPaged(int page, int size);

    /* ==========================================
       4. GET WORKER BY ID
    ========================================== */

    WorkerResponseDto getWorkerById(Long id);

    /* ==========================================
       5. SEARCH WORKERS
    ========================================== */

    Page<WorkerResponseDto> searchWorkers(
            String keyword,
            int page,
            int size
    );

    /* ==========================================
       6. FILTER BY SPECIALIZATION
    ========================================== */

    Page<WorkerResponseDto> filterWorkersBySpecialization(
            String specialization,
            int page,
            int size
    );

    /* ==========================================
       7. UPDATE WORKER
    ========================================== */

    Worker updateWorker(
            Long id,
            WorkerrequestDto workerrequestDto
    );

    /* ==========================================
       8. DELETE WORKER
    ========================================== */

    void deleteWorker(Long id);

    /* ==========================================
       9. DASHBOARD COUNTS
    ========================================== */

    long getTotalWorkers();

    long getElectricianCount();

    long getPlumberCount();

    long getCleanerCount();

    /* ==========================================
       10. DROPDOWN
    ========================================== */

    List<WorkerDropdownDto> getWorkersForDropdown();

    /* ==========================================
       11. AVAILABLE WORKERS
    ========================================== */

    List<WorkerResponseDto> getAvailableWorkers();

    /* ==========================================
       12. UPDATE WORKER STATUS
    ========================================== */

    WorkerResponseDto updateWorkerStatus(
            Long workerId,
            String workerStatus
    );

    /* ==========================================
       13. ACTIVE COMPLAINTS
    ========================================== */

    void incrementActiveComplaints(Long workerId);

    void decrementActiveComplaints(Long workerId);

    /* ==========================================
       14. WORKER STATUS COUNTS
    ========================================== */

    long getAvailableWorkerCount();

    long getBusyWorkerCount();

    long getOnLeaveWorkerCount();

}