package com.example.hostelcompilant.serviceImplementation;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.hostelcompilant.dto.UpdateWorkerComplaintStatusDto;
import com.example.hostelcompilant.dto.WorkerComplaintCountDto;
import com.example.hostelcompilant.dto.WorkerComplaintResponseDto;
import com.example.hostelcompilant.entity.Compilant;
import com.example.hostelcompilant.entity.Notification;
import com.example.hostelcompilant.repository.CompilantRepository;
import com.example.hostelcompilant.repository.NotificationRepository;
import com.example.hostelcompilant.service.WorkerComplaintService;

@Service
public class WorkerComplaintServiceImplementation implements WorkerComplaintService {

    @Autowired
    private CompilantRepository compilantRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    // =========================================================
    // CONVERT ENTITY -> DTO
    // =========================================================
    private WorkerComplaintResponseDto convertToDto(Compilant compilant) {

        Long studentId = null;
        String studentName = null;
        String studentEmail = null;
        String studentPhoneNumber = null;

        if (compilant.getUser() != null) {
            studentId = compilant.getUser().getId();
            studentName = compilant.getUser().getName();
            studentEmail = compilant.getUser().getEmail();
            studentPhoneNumber = compilant.getUser().getPhoneNumber();
        }

        return new WorkerComplaintResponseDto(
                compilant.getId(),
                compilant.getCompilantCode(),
                compilant.getCategory(),
                compilant.getIssueType(),
                compilant.getCompilantTitle(),
                compilant.getDescription(),
                compilant.getBlockName(),
                compilant.getFloorNumber(),
                compilant.getRoomNumber(),
                compilant.getLocation(),
                compilant.getPriority(),
                compilant.getStatus(),
                compilant.getPhotoUrl(),
                compilant.getCreatedAt(),
                studentId,
                studentName,
                studentEmail,
                studentPhoneNumber
        );
    }

    // =========================================================
    // 1. GET ALL COMPLAINTS ASSIGNED TO ONE WORKER
    // =========================================================
    @Override
    public List<WorkerComplaintResponseDto> getComplaintsByWorkerId(Long workerId) {
        List<Compilant> complaints = compilantRepository.findByWorker_Id(workerId);

        return complaints.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    // =========================================================
    // 2. GET ONE COMPLAINT BY ID
    // =========================================================
    @Override
    public WorkerComplaintResponseDto getComplaintById(Long complaintId) {
        Compilant compilant = compilantRepository.findById(complaintId)
                .orElseThrow(() -> new RuntimeException("Complaint not found with id: " + complaintId));

        return convertToDto(compilant);
    }

    // =========================================================
    // 3. FILTER WORKER COMPLAINTS BY STATUS
    // =========================================================
    @Override
    public List<WorkerComplaintResponseDto> getComplaintsByWorkerIdAndStatus(Long workerId, String status) {
        List<Compilant> complaints = compilantRepository.findByWorker_IdAndStatus(workerId, status);

        return complaints.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    // =========================================================
    // 4. UPDATE COMPLAINT STATUS BY WORKER
    // =========================================================
    @Override
    public WorkerComplaintResponseDto updateComplaintStatus(Long complaintId, UpdateWorkerComplaintStatusDto requestDto) {

        Compilant compilant = compilantRepository.findById(complaintId)
                .orElseThrow(() -> new RuntimeException("Complaint not found with id: " + complaintId));

        String status = requestDto.getStatus();

        if (status == null || status.isBlank()) {
            throw new RuntimeException("Status cannot be empty");
        }

        // standardize status format
        status = status.trim().toUpperCase().replace(" ", "_");

        // allow only valid statuses
        if (!status.equals("PENDING") && !status.equals("IN_PROGRESS") && !status.equals("RESOLVED")) {
            throw new RuntimeException("Invalid complaint status. Use PENDING / IN_PROGRESS / RESOLVED");
        }

        compilant.setStatus(status);

        Compilant updatedComplaint = compilantRepository.save(compilant);

        // CREATE NOTIFICATION FOR STUDENT
        if (updatedComplaint.getUser() != null) {
            Notification notification = new Notification();
            notification.setUser(updatedComplaint.getUser());
            notification.setMessage("Your complaint status has been updated to " + updatedComplaint.getStatus());
            notification.setStatus("UNREAD");
            notification.setCreatedAt(LocalDateTime.now());

            notificationRepository.save(notification);
        }

        return convertToDto(updatedComplaint);
    }

    // =========================================================
    // 5. WORKER DASHBOARD COUNTS
    // =========================================================
    @Override
    public WorkerComplaintCountDto getWorkerComplaintCounts(Long workerId) {

        long total = compilantRepository.countByWorker_Id(workerId);
        long pending = compilantRepository.countByWorker_IdAndStatus(workerId, "PENDING");
        long inProgress = compilantRepository.countByWorker_IdAndStatus(workerId, "IN_PROGRESS");
        long resolved = compilantRepository.countByWorker_IdAndStatus(workerId, "RESOLVED");

        return new WorkerComplaintCountDto(total, pending, inProgress, resolved);
    }
}