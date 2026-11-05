package com.example.hostelcompilant.service;

import java.util.List;

import com.example.hostelcompilant.dto.AssignWorkerRequestDto;
import com.example.hostelcompilant.dto.AssignWorkerResponseDto;

public interface AssignWorkerService {

    AssignWorkerResponseDto assignWorker(Long compilantId, AssignWorkerRequestDto requestDto);

    List<AssignWorkerResponseDto> getAllAssignments();

    List<AssignWorkerResponseDto> getAssignmentsByWorkerId(Long workerId);

    void deleteAssignment(Long id);
}