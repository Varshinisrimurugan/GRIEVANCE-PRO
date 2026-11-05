package com.example.hostelcompilant.serviceImplementation;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.hostelcompilant.dto.AdminCompilantResponseDto;
import com.example.hostelcompilant.dto.AssignWorkerRequestDto;
import com.example.hostelcompilant.dto.UpdateCompilantStatusRequestDto;
import com.example.hostelcompilant.entity.Compilant;
import com.example.hostelcompilant.entity.Notification;
import com.example.hostelcompilant.entity.Worker;
import com.example.hostelcompilant.repository.CompilantRepository;
import com.example.hostelcompilant.repository.NotificationRepository;
import com.example.hostelcompilant.repository.WorkerRepository;
import com.example.hostelcompilant.service.AdminCompilantService;

@Service
public class AdminCompilantServiceImplementation implements AdminCompilantService {

    @Autowired
    private CompilantRepository compilantRepository;

    @Autowired
    private WorkerRepository workerRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    // =========================================================
    // CONVERT ENTITY -> ADMIN RESPONSE DTO
    // =========================================================
    private AdminCompilantResponseDto convertToDto(Compilant compilant) {

        Long userId = null;
        String studentName = null;
        String studentEmail = null;

        if (compilant.getUser() != null) {
            userId = compilant.getUser().getId();
            studentName = compilant.getUser().getName();
            studentEmail = compilant.getUser().getEmail();
        }

        Long workerId = null;
        String workerName = null;
        String workerSpecialization = null;

        if (compilant.getWorker() != null) {
            workerId = compilant.getWorker().getId();
            workerName = compilant.getWorker().getWorkerName();
            workerSpecialization = compilant.getWorker().getSpecialization();
        }

        return new AdminCompilantResponseDto(
                compilant.getId(),
                compilant.getCompilantCode(),
                compilant.getCategory(),
                compilant.getIssueType(),
                compilant.getCompilantTitle(),
                compilant.getLocation(),
                compilant.getDescription(),
                compilant.getPriority(),
                compilant.getStatus(),
                compilant.getPhotoUrl(),
                compilant.getCreatedAt(),
                userId,
                studentName,
                studentEmail,
                compilant.getRoomNumber(),
                workerId,
                workerName,
                workerSpecialization
        );
    }

    // =========================================================
    // GET ALL COMPLAINTS
    // =========================================================
    @Override
    public Page<AdminCompilantResponseDto> getAllComplaints(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Compilant> complaintPage = compilantRepository.findAll(pageable);
        return complaintPage.map(this::convertToDto);
    }

    // =========================================================
    // GET COMPLAINT BY ID
    // =========================================================
    @Override
    public AdminCompilantResponseDto getComplaintById(Long complaintId) {
        Compilant compilant = compilantRepository.findById(complaintId)
                .orElseThrow(() -> new RuntimeException("Complaint not found with id: " + complaintId));

        return convertToDto(compilant);
    }

    // =========================================================
    // SEARCH COMPLAINTS
    // =========================================================
    @Override
    public Page<AdminCompilantResponseDto> searchComplaints(String keyword, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);

        Page<Compilant> complaintPage =
                compilantRepository.findByCompilantCodeContainingIgnoreCaseOrCompilantTitleContainingIgnoreCaseOrLocationContainingIgnoreCase(
                        keyword, keyword, keyword, pageable
                );

        return complaintPage.map(this::convertToDto);
    }

    // =========================================================
    // FILTER COMPLAINTS
    // =========================================================
    @Override
    public Page<AdminCompilantResponseDto> filterComplaints(String category, String status, String priority, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Compilant> complaintPage;

        boolean hasCategory = category != null && !category.isBlank();
        boolean hasStatus = status != null && !status.isBlank();
        boolean hasPriority = priority != null && !priority.isBlank();

        if (hasCategory && hasStatus && hasPriority) {
            complaintPage = compilantRepository.findByCategoryAndStatusAndPriority(category, status, priority, pageable);
        } else if (hasCategory && hasStatus) {
            complaintPage = compilantRepository.findByCategoryAndStatus(category, status, pageable);
        } else if (hasCategory && hasPriority) {
            complaintPage = compilantRepository.findByCategoryAndPriority(category, priority, pageable);
        } else if (hasStatus && hasPriority) {
            complaintPage = compilantRepository.findByStatusAndPriority(status, priority, pageable);
        } else if (hasCategory) {
            complaintPage = compilantRepository.findByCategory(category, pageable);
        } else if (hasStatus) {
            complaintPage = compilantRepository.findByStatus(status, pageable);
        } else if (hasPriority) {
            complaintPage = compilantRepository.findByPriority(priority, pageable);
        } else {
            complaintPage = compilantRepository.findAll(pageable);
        }

        return complaintPage.map(this::convertToDto);
    }

    // =========================================================
    // ASSIGN WORKER TO COMPLAINT
    // =========================================================
    @Override
    public Compilant assignWorkerToComplaint(Long complaintId, AssignWorkerRequestDto requestDto) {

        Compilant compilant = compilantRepository.findById(complaintId)
                .orElseThrow(() -> new RuntimeException("Complaint not found with id: " + complaintId));

        Worker worker = workerRepository.findById(requestDto.getWorkerId())
                .orElseThrow(() -> new RuntimeException("Worker not found with id: " + requestDto.getWorkerId()));

        compilant.setWorker(worker);

        // if complaint still pending, move it to In Progress after assigning worker
        if (compilant.getStatus() == null || compilant.getStatus().equalsIgnoreCase("Pending")) {
            compilant.setStatus("In Progress");
        }

        Compilant updatedComplaint = compilantRepository.save(compilant);

        // CREATE NOTIFICATION FOR STUDENT
        if (updatedComplaint.getUser() != null) {
            Notification notification = new Notification();
            notification.setUser(updatedComplaint.getUser());
            notification.setMessage("Worker assigned for your complaint. Current status: " + updatedComplaint.getStatus());
            notification.setStatus("UNREAD");
            notification.setCreatedAt(LocalDateTime.now());
            notificationRepository.save(notification);
        }

        return updatedComplaint;
    }

    // =========================================================
    // UPDATE COMPLAINT STATUS
    // =========================================================
    @Override
    public Compilant updateComplaintStatus(Long complaintId, UpdateCompilantStatusRequestDto requestDto) {

        Compilant compilant = compilantRepository.findById(complaintId)
                .orElseThrow(() -> new RuntimeException("Complaint not found with id: " + complaintId));

        compilant.setStatus(requestDto.getStatus());

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

        return updatedComplaint;
    }
}