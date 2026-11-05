package com.example.hostelcompilant.service;

import org.springframework.data.domain.Page;

import com.example.hostelcompilant.dto.AdminCompilantResponseDto;
import com.example.hostelcompilant.dto.AssignWorkerRequestDto;
import com.example.hostelcompilant.dto.UpdateCompilantStatusRequestDto;
import com.example.hostelcompilant.entity.Compilant;

public interface AdminCompilantService {

    // GET ALL COMPLAINTS WITH PAGINATION
    Page<AdminCompilantResponseDto> getAllComplaints(int page, int size);

    // GET ONE COMPLAINT BY ID
    AdminCompilantResponseDto getComplaintById(Long complaintId);

    // SEARCH COMPLAINTS
    Page<AdminCompilantResponseDto> searchComplaints(String keyword, int page, int size);

    // FILTER COMPLAINTS
    Page<AdminCompilantResponseDto> filterComplaints(String category, String status, String priority, int page, int size);

    // ASSIGN WORKER TO COMPLAINT
    Compilant assignWorkerToComplaint(Long complaintId, AssignWorkerRequestDto requestDto);

    // UPDATE COMPLAINT STATUS
    Compilant updateComplaintStatus(Long complaintId, UpdateCompilantStatusRequestDto requestDto);
}