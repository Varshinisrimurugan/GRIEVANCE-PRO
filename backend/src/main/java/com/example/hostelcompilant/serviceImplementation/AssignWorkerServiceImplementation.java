package com.example.hostelcompilant.serviceImplementation;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.hostelcompilant.dto.AssignWorkerRequestDto;
import com.example.hostelcompilant.dto.AssignWorkerResponseDto;
import com.example.hostelcompilant.entity.AssignWorker;
import com.example.hostelcompilant.entity.Compilant;
import com.example.hostelcompilant.entity.Notification;
import com.example.hostelcompilant.entity.Worker;
import com.example.hostelcompilant.repository.AssignWorkerRepository;
import com.example.hostelcompilant.repository.CompilantRepository;
import com.example.hostelcompilant.repository.NotificationRepository;
import com.example.hostelcompilant.repository.WorkerRepository;
import com.example.hostelcompilant.service.AssignWorkerService;

@Service
public class AssignWorkerServiceImplementation implements AssignWorkerService {

    @Autowired
    private AssignWorkerRepository assignWorkerRepository;

    @Autowired
    private CompilantRepository compilantRepository;

    @Autowired
    private WorkerRepository workerRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    private AssignWorkerResponseDto convertToDto(AssignWorker assignWorker) {
        AssignWorkerResponseDto dto = new AssignWorkerResponseDto();

        dto.setAssignId(assignWorker.getId());

        if (assignWorker.getCompilant() != null) {
            dto.setCompilantId(assignWorker.getCompilant().getId());
            dto.setCompilantTitle(assignWorker.getCompilant().getCompilantTitle());
            dto.setStatus(assignWorker.getCompilant().getStatus());
        }

        if (assignWorker.getWorker() != null) {
            dto.setWorkerId(assignWorker.getWorker().getId());
            dto.setWorkerName(assignWorker.getWorker().getWorkerName());
            dto.setSpecialization(assignWorker.getWorker().getSpecialization());
        }

        dto.setAssignedAt(assignWorker.getAssignedAt());

        return dto;
    }

    @Override
    public AssignWorkerResponseDto assignWorker(Long compilantId, AssignWorkerRequestDto requestDto) {

        if (requestDto.getWorkerId() == null) {
            throw new RuntimeException("workerId is required");
        }

        Compilant compilant = compilantRepository.findById(compilantId)
                .orElseThrow(() -> new RuntimeException("Complaint not found with id: " + compilantId));

        Worker worker = workerRepository.findById(requestDto.getWorkerId())
                .orElseThrow(() -> new RuntimeException("Worker not found with id: " + requestDto.getWorkerId()));

        // set worker in complaint
        compilant.setWorker(worker);

        // set standard complaint status
        if (compilant.getStatus() == null || compilant.getStatus().equalsIgnoreCase("PENDING")) {
            compilant.setStatus("IN_PROGRESS");
        }

        compilantRepository.save(compilant);

        // create assignment history
        AssignWorker assignWorker = new AssignWorker();
        assignWorker.setCompilant(compilant);
        assignWorker.setWorker(worker);
        assignWorker.setAssignedAt(LocalDateTime.now());

        AssignWorker saved = assignWorkerRepository.save(assignWorker);

        // create notification for student
        if (compilant.getUser() != null) {
            Notification notification = new Notification();
            notification.setUser(compilant.getUser());
            notification.setMessage("Worker assigned for your complaint. Current status: " + compilant.getStatus());
            notification.setStatus("UNREAD");
            notification.setCreatedAt(LocalDateTime.now());

            notificationRepository.save(notification);
        }

        return convertToDto(saved);
    }

    @Override
    public List<AssignWorkerResponseDto> getAllAssignments() {
        return assignWorkerRepository.findAll()
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<AssignWorkerResponseDto> getAssignmentsByWorkerId(Long workerId) {
        return assignWorkerRepository.findByWorker_Id(workerId)
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteAssignment(Long id) {
        AssignWorker assignWorker = assignWorkerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Assignment not found with id: " + id));

        assignWorkerRepository.delete(assignWorker);
    }
}