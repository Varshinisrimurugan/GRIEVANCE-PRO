package com.example.hostelcompilant.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import com.example.hostelcompilant.dto.CompilantRequestDto;
import com.example.hostelcompilant.dto.WorkerDropdownDto;
import com.example.hostelcompilant.entity.Compilant;

public interface CompilantService {

    // =========================================================
    // CREATE COMPLAINT USING DTO
    // =========================================================
    void createComplaint(CompilantRequestDto compilantRequestDto);

    // =========================================================
    // CREATE COMPLAINT WITH PHOTO
    // =========================================================
    Compilant createCompilantWithPhoto(
            String category,
            String issueType,
            String blockName,
            String floorNumber,
            String roomNumber,
            String compilantTitle,
            String location,
            String description,
            String priority,
            Long userId,
            MultipartFile photo
    ) throws Exception;

    // =========================================================
    // BASIC CRUD
    // =========================================================
    List<Compilant> getAllCompilants();

    Compilant getCompilantById(Long id);

    void deleteCompilant(Long id);

    // =========================================================
    // USER SIDE
    // =========================================================
    List<Compilant> getComplaintsByUserId(Long userId);

    Page<Compilant> getCompilantsByUserIdPaged(Long userId, int page, int size);

    long getTotalCompilantsByUserId(Long userId);

    long getPendingCompilantsByUserId(Long userId);

    long getInProgressCompilantsByUserId(Long userId);

    long getResolvedCompilantsByUserId(Long userId);

    List<Compilant> searchCompilantsByUserId(Long userId, String keyword);

    List<Compilant> getCompilantsByUserIdAndStatus(Long userId, String status);

    List<Compilant> getCompilantsByUserIdAndPriority(Long userId, String priority);

    List<Compilant> getCompilantsByUserIdAndCategory(Long userId, String category);

    // =========================================================
    // ADMIN SIDE
    // =========================================================
    Page<Compilant> getAllCompilantsPaged(int page, int size);

    Page<Compilant> searchAllCompilants(String keyword, int page, int size);

    Page<Compilant> filterCompilants(
            String category,
            String status,
            String priority,
            int page,
            int size);

    Compilant assignWorkerToCompilant(Long compilantId, Long workerId);

    Compilant updateCompilantPriority(Long compilantId, String priority);

    Compilant updateCompilantStatus(Long compilantId, String status);

    // =========================================================
    // WORKER DASHBOARD
    // =========================================================
    List<Compilant> getWorkerComplaints(Long workerId);

    long getWorkerTotalComplaints(Long workerId);

    long getWorkerPendingComplaints(Long workerId);

    long getWorkerInProgressComplaints(Long workerId);

    long getWorkerResolvedComplaints(Long workerId);

    Compilant updateWorkerComplaintStatus(Long complaintId, String status);

    // =========================================================
    // WORKER DROPDOWN
    // =========================================================
    List<WorkerDropdownDto> getAllWorkersForDropdown();

}