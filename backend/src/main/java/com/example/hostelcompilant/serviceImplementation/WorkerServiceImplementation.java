package com.example.hostelcompilant.serviceImplementation;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.hostelcompilant.dto.WorkerDropdownDto;
import com.example.hostelcompilant.dto.WorkerResponseDto;
import com.example.hostelcompilant.dto.WorkerrequestDto;
import com.example.hostelcompilant.entity.Role;
import com.example.hostelcompilant.entity.User;
import com.example.hostelcompilant.entity.Worker;
import com.example.hostelcompilant.repository.RoleRepository;
import com.example.hostelcompilant.repository.UserRepository;
import com.example.hostelcompilant.repository.WorkerRepository;
import com.example.hostelcompilant.service.WorkerService;

@Service
public class WorkerServiceImplementation implements WorkerService {

    @Autowired
    private WorkerRepository workerRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    // =========================================================
    // CONVERT ENTITY -> DTO
    // =========================================================

    private WorkerResponseDto convertToDto(Worker worker) {

        WorkerResponseDto dto = new WorkerResponseDto();

        dto.setWorker_id(worker.getId());

        dto.setWorker_name(worker.getWorkerName());

        dto.setSpecialization(worker.getSpecialization());

        // Worker Availability

        dto.setWorkerStatus(worker.getWorkerStatus());

        dto.setActiveComplaints(worker.getActiveComplaints());

        if (worker.getUser() != null) {

            dto.setEmail(worker.getUser().getEmail());

            dto.setPhone_number(worker.getUser().getPhoneNumber());

        }

        if (worker.getCompilants() != null) {

            dto.setAssigned_compilants_count(

                    worker.getCompilants().size()

            );

        }

        else {

            dto.setAssigned_compilants_count(0);

        }

        return dto;

    }
    // =========================================================
    // 1. CREATE WORKER
    // =========================================================
    @Override
    public Worker createWorker(WorkerrequestDto workerrequestDto) {

        User user = userRepository.findById(
                workerrequestDto.getUser_id())
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found with id : "
                                        + workerrequestDto.getUser_id()));

        Role workerRole = roleRepository
                .findByRoleName("WORKER")
                .orElseThrow(() ->
                        new RuntimeException(
                                "WORKER role not found"));

        if (!user.getRole().contains(workerRole)) {

            user.getRole().add(workerRole);

            userRepository.save(user);

        }

        Worker worker = new Worker();

        worker.setWorkerName(
                workerrequestDto.getWorker_name());

        worker.setSpecialization(
                workerrequestDto.getSpecialization());

        worker.setUser(user);

        // Default Status

        worker.setWorkerStatus("AVAILABLE");

        worker.setActiveComplaints(0);

        return workerRepository.save(worker);

    }

    // =========================================================
    // 2. GET ALL WORKERS
    // =========================================================
    @Override
    public List<WorkerResponseDto> getAllWorkers() {

        List<Worker> workers = workerRepository.findAll();

        return workers.stream()

                .map(this::convertToDto)

                .collect(Collectors.toList());

    }

    // =========================================================
    // 3. GET ALL WORKERS WITH PAGINATION
    // =========================================================
    @Override
    public Page<WorkerResponseDto> getAllWorkersPaged(
            int page,
            int size) {

        Pageable pageable = PageRequest.of(page, size);

        Page<Worker> workerPage =
                workerRepository.findAll(pageable);

        List<WorkerResponseDto> dtoList =
                workerPage.getContent()

                        .stream()

                        .map(this::convertToDto)

                        .collect(Collectors.toList());

        return new PageImpl<>(

                dtoList,

                pageable,

                workerPage.getTotalElements()

        );

    }
    // =========================================================
    // 4. GET WORKER BY ID
    // =========================================================
    @Override
    public WorkerResponseDto getWorkerById(Long id) {

        Worker worker = workerRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Worker not found with id : " + id));

        return convertToDto(worker);

    }

    // =========================================================
    // 5. SEARCH WORKERS
    // =========================================================
    @Override
    public Page<WorkerResponseDto> searchWorkers(
            String keyword,
            int page,
            int size) {

        Pageable pageable = PageRequest.of(page, size);

        Page<Worker> workerPage =
                workerRepository
                        .findByWorkerNameContainingIgnoreCaseOrSpecializationContainingIgnoreCase(
                                keyword,
                                keyword,
                                pageable);

        List<WorkerResponseDto> dtoList =
                workerPage.getContent()
                        .stream()
                        .map(this::convertToDto)
                        .collect(Collectors.toList());

        return new PageImpl<>(

                dtoList,

                pageable,

                workerPage.getTotalElements()

        );

    }

    // =========================================================
    // 6. FILTER WORKERS BY SPECIALIZATION
    // =========================================================
    @Override
    public Page<WorkerResponseDto> filterWorkersBySpecialization(
            String specialization,
            int page,
            int size) {

        Pageable pageable = PageRequest.of(page, size);

        Page<Worker> workerPage =
                workerRepository.findBySpecializationIgnoreCase(
                        specialization,
                        pageable);

        List<WorkerResponseDto> dtoList =
                workerPage.getContent()
                        .stream()
                        .map(this::convertToDto)
                        .collect(Collectors.toList());

        return new PageImpl<>(

                dtoList,

                pageable,

                workerPage.getTotalElements()

        );

    }

    // =========================================================
    // 7. UPDATE WORKER
    // =========================================================
    @Override
    public Worker updateWorker(
            Long id,
            WorkerrequestDto workerrequestDto) {

        Worker worker = workerRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Worker not found with id : " + id));

        worker.setWorkerName(
                workerrequestDto.getWorker_name());

        worker.setSpecialization(
                workerrequestDto.getSpecialization());

        // Preserve availability if null
        if (worker.getWorkerStatus() == null) {

            worker.setWorkerStatus("AVAILABLE");

        }

        if (worker.getActiveComplaints() == null) {

            worker.setActiveComplaints(0);

        }

        return workerRepository.save(worker);

    }
    // =========================================================
    // 8. DELETE WORKER
    // =========================================================
    @Override
    public void deleteWorker(Long id) {

        Worker worker = workerRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Worker not found with id : " + id));

        workerRepository.delete(worker);

    }

    // =========================================================
    // 9. DASHBOARD COUNTS
    // =========================================================
    @Override
    public long getTotalWorkers() {

        return workerRepository.count();

    }

    @Override
    public long getElectricianCount() {

        return workerRepository
                .countBySpecializationIgnoreCase("Electrician");

    }

    @Override
    public long getPlumberCount() {

        return workerRepository
                .countBySpecializationIgnoreCase("Plumber");

    }

    @Override
    public long getCleanerCount() {

        return workerRepository
                .countBySpecializationIgnoreCase("Cleaner");

    }

    // =========================================================
    // 10. WORKER DROPDOWN
    // =========================================================
    @Override
    public List<WorkerDropdownDto> getWorkersForDropdown() {

        return workerRepository
                .findByWorkerStatusOrderByActiveComplaintsAsc("AVAILABLE")
                .stream()
                .map(worker -> new WorkerDropdownDto(
                        worker.getId(),
                        worker.getWorkerName()))
                .collect(Collectors.toList());

    }

    // =========================================================
    // 11. AVAILABLE WORKERS
    // =========================================================
    @Override
    public List<WorkerResponseDto> getAvailableWorkers() {

        return workerRepository
                .findByWorkerStatusOrderByActiveComplaintsAsc("AVAILABLE")
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());

    }

    // =========================================================
    // 12. UPDATE WORKER STATUS
    // =========================================================
    @Override
    public WorkerResponseDto updateWorkerStatus(
            Long workerId,
            String workerStatus) {

        Worker worker = workerRepository.findById(workerId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Worker not found with id : " + workerId));

        worker.setWorkerStatus(workerStatus);

        workerRepository.save(worker);

        return convertToDto(worker);

    }

    // =========================================================
    // 13. INCREMENT ACTIVE COMPLAINTS
    // =========================================================
    @Override
    public void incrementActiveComplaints(Long workerId) {

        Worker worker = workerRepository.findById(workerId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Worker not found"));

        int count = worker.getActiveComplaints() == null
                ? 0
                : worker.getActiveComplaints();

        worker.setActiveComplaints(count + 1);

        worker.setWorkerStatus("BUSY");

        workerRepository.save(worker);

    }

    // =========================================================
    // 14. DECREMENT ACTIVE COMPLAINTS
    // =========================================================
    @Override
    public void decrementActiveComplaints(Long workerId) {

        Worker worker = workerRepository.findById(workerId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Worker not found"));

        int count = worker.getActiveComplaints() == null
                ? 0
                : worker.getActiveComplaints();

        if (count > 0) {

            count--;

        }

        worker.setActiveComplaints(count);

        // Only switch back to AVAILABLE if not manually on leave
        if (count == 0 &&
                !"ON_LEAVE".equals(worker.getWorkerStatus())) {

            worker.setWorkerStatus("AVAILABLE");

        }

        workerRepository.save(worker);

    }

    // =========================================================
    // 15. STATUS COUNTS
    // =========================================================
    @Override
    public long getAvailableWorkerCount() {

        return workerRepository.countByWorkerStatus("AVAILABLE");

    }

    @Override
    public long getBusyWorkerCount() {

        return workerRepository.countByWorkerStatus("BUSY");

    }

    @Override
    public long getOnLeaveWorkerCount() {

        return workerRepository.countByWorkerStatus("ON_LEAVE");

    }

}