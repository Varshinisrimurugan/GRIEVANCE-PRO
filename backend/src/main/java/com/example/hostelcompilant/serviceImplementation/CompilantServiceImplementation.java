package com.example.hostelcompilant.serviceImplementation;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.hostelcompilant.dto.CompilantRequestDto;
import com.example.hostelcompilant.dto.WorkerDropdownDto;
import com.example.hostelcompilant.entity.Compilant;
import com.example.hostelcompilant.entity.Notification;
import com.example.hostelcompilant.entity.User;
import com.example.hostelcompilant.entity.Worker;
import com.example.hostelcompilant.repository.CompilantRepository;
import com.example.hostelcompilant.repository.NotificationRepository;
import com.example.hostelcompilant.repository.UserRepository;
import com.example.hostelcompilant.repository.WorkerRepository;
import com.example.hostelcompilant.service.CompilantService;

@Service
public class CompilantServiceImplementation implements CompilantService {

    @Autowired
    private CompilantRepository compilantRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private WorkerRepository workerRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    // =========================================================
    // GENERATE COMPLAINT CODE
    // =========================================================
    private String generateCompilantCode() {
        Compilant lastCompilant = compilantRepository.findTopByOrderByIdDesc();

        if (lastCompilant == null || lastCompilant.getCompilantCode() == null) {
            return "C101";
        }

        String lastCode = lastCompilant.getCompilantCode(); // example C101
        int num = Integer.parseInt(lastCode.substring(1));  // 101
        return "C" + (num + 1);
    }

    // =========================================================
    // CREATE NOTIFICATION
    // =========================================================
    private void createNotificationForCompilant(Long userId, String message) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        Notification notification = new Notification();
        notification.setUser(user);
        notification.setMessage(message);
        notification.setStatus("UNREAD");
        notification.setCreatedAt(LocalDateTime.now());

        notificationRepository.save(notification);
    }

    // =========================================================
    // SEND MAIL TO ADMIN
    // =========================================================
    // If you already have mail code elsewhere, keep that.
    // This method is optional. If not needed, you can leave it empty.
    private void sendMailToAdmin(Compilant compilant) {
        // TODO: Add your mail sending logic here if needed
    }

    // =========================================================
    // 1. CREATE COMPLAINT USING DTO
    // =========================================================
    @Override
    public void createComplaint(CompilantRequestDto compilantRequestDto) {

        // -------- REQUIRED FIELD VALIDATION --------
        if (compilantRequestDto.getCategory() == null || compilantRequestDto.getCategory().isBlank()) {
            throw new RuntimeException("Category is required");
        }
        if (compilantRequestDto.getIssue_type() == null || compilantRequestDto.getIssue_type().isBlank()) {
            throw new RuntimeException("Issue type is required");
        }
        if (compilantRequestDto.getBlock_name() == null || compilantRequestDto.getBlock_name().isBlank()) {
            throw new RuntimeException("Block name is required");
        }
        if (compilantRequestDto.getFloor_number() == null || compilantRequestDto.getFloor_number().isBlank()) {
            throw new RuntimeException("Floor number is required");
        }
        if (compilantRequestDto.getRoom_number() == null || compilantRequestDto.getRoom_number().isBlank()) {
            throw new RuntimeException("Room number is required");
        }
        if (compilantRequestDto.getCompilant_title() == null || compilantRequestDto.getCompilant_title().isBlank()) {
            throw new RuntimeException("Complaint title is required");
        }
        if (compilantRequestDto.getLocation() == null || compilantRequestDto.getLocation().isBlank()) {
            throw new RuntimeException("Location is required");
        }
        if (compilantRequestDto.getDescription() == null || compilantRequestDto.getDescription().isBlank()) {
            throw new RuntimeException("Description is required");
        }
        if (compilantRequestDto.getPriority() == null || compilantRequestDto.getPriority().isBlank()) {
            throw new RuntimeException("Priority is required");
        }
        if (compilantRequestDto.getUser_id() == null) {
            throw new RuntimeException("User id is required");
        }

        // -------- FIND USER --------
        User user = userRepository.findById(compilantRequestDto.getUser_id())
                .orElseThrow(() -> new RuntimeException("User not found with id: " + compilantRequestDto.getUser_id()));

        // -------- CREATE ENTITY --------
        Compilant compilant = new Compilant();
        compilant.setCompilantCode(generateCompilantCode());
        compilant.setCategory(compilantRequestDto.getCategory().trim());
        compilant.setIssueType(compilantRequestDto.getIssue_type().trim());
        compilant.setBlockName(compilantRequestDto.getBlock_name().trim());
        compilant.setFloorNumber(compilantRequestDto.getFloor_number().trim());
        compilant.setRoomNumber(compilantRequestDto.getRoom_number().trim());
        compilant.setCompilantTitle(compilantRequestDto.getCompilant_title().trim());
        compilant.setLocation(compilantRequestDto.getLocation().trim());
        compilant.setDescription(compilantRequestDto.getDescription().trim());
        compilant.setPriority(compilantRequestDto.getPriority().trim());
        compilant.setPhotoUrl(compilantRequestDto.getPhoto_url());
        compilant.setCreatedAt(LocalDateTime.now());
        compilant.setUser(user);

        if (compilantRequestDto.getStatus() == null || compilantRequestDto.getStatus().isBlank()) {
            compilant.setStatus("PENDING");
        } else {
            compilant.setStatus(compilantRequestDto.getStatus().trim());
        }

        // -------- SAVE --------
        Compilant savedCompilant = compilantRepository.save(compilant);

        // -------- NOTIFICATION --------
        createNotificationForCompilant(
                savedCompilant.getUser().getId(),
                "Your complaint has been submitted successfully"
        );

        // -------- MAIL --------
        sendMailToAdmin(savedCompilant);
    }

    // =========================================================
    // 2. CREATE COMPLAINT WITH PHOTO
    // =========================================================
    @Override
    public Compilant createCompilantWithPhoto(
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
            MultipartFile photo) throws Exception {

        if (category == null || category.isBlank()) {
            throw new RuntimeException("Category is required");
        }
        if (issueType == null || issueType.isBlank()) {
            throw new RuntimeException("Issue type is required");
        }
        if (blockName == null || blockName.isBlank()) {
            throw new RuntimeException("Block name is required");
        }
        if (floorNumber == null || floorNumber.isBlank()) {
            throw new RuntimeException("Floor number is required");
        }
        if (roomNumber == null || roomNumber.isBlank()) {
            throw new RuntimeException("Room number is required");
        }
        if (compilantTitle == null || compilantTitle.isBlank()) {
            throw new RuntimeException("Complaint title is required");
        }
        if (location == null || location.isBlank()) {
            throw new RuntimeException("Location is required");
        }
        if (description == null || description.isBlank()) {
            throw new RuntimeException("Description is required");
        }
        if (priority == null || priority.isBlank()) {
            throw new RuntimeException("Priority is required");
        }
        if (userId == null) {
            throw new RuntimeException("User id is required");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        Compilant compilant = new Compilant();
        compilant.setCompilantCode(generateCompilantCode());
        compilant.setCategory(category.trim());
        compilant.setIssueType(issueType.trim());
        compilant.setBlockName(blockName.trim());
        compilant.setFloorNumber(floorNumber.trim());
        compilant.setRoomNumber(roomNumber.trim());
        compilant.setCompilantTitle(compilantTitle.trim());
        compilant.setLocation(location.trim());
        compilant.setDescription(description.trim());
        compilant.setPriority(priority.trim());
        compilant.setStatus("PENDING");
        compilant.setCreatedAt(LocalDateTime.now());
        compilant.setUser(user);

        // photo save
        if (photo != null && !photo.isEmpty()) {
            String uploadDir = "uploads/";
            File dir = new File(uploadDir);
            if (!dir.exists()) {
                dir.mkdirs();
            }

            String fileName = System.currentTimeMillis() + "_" + photo.getOriginalFilename();
            Path filePath = Paths.get(uploadDir, fileName);
            Files.write(filePath, photo.getBytes());

            compilant.setPhotoUrl("http://localhost:8081/uploads/" + fileName);
        }

        Compilant savedCompilant = compilantRepository.save(compilant);

        createNotificationForCompilant(
                savedCompilant.getUser().getId(),
                "Your complaint has been submitted successfully"
        );

        sendMailToAdmin(savedCompilant);

        return savedCompilant;
    }

    // =========================================================
    // 3. GET ALL COMPLAINTS
    // =========================================================
    @Override
    public List<Compilant> getAllCompilants() {
        return compilantRepository.findAll();
    }

    // =========================================================
    // 4. GET COMPLAINT BY ID
    // =========================================================
    @Override
    public Compilant getCompilantById(Long id) {
        return compilantRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Complaint not found with id: " + id));
    }

    // =========================================================
    // 5. DELETE COMPLAINT
    // =========================================================
    @Override
    public void deleteCompilant(Long id) {
        Compilant compilant = compilantRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Complaint not found with id: " + id));

        compilantRepository.delete(compilant);
    }

    // =========================================================
    // 6. GET COMPLAINTS BY USER ID
    // =========================================================
    @Override
    public List<Compilant> getComplaintsByUserId(Long userId) {
        return compilantRepository.findByUser_Id(userId);
    }

    // =========================================================
    // 7. USER PAGINATION
    // =========================================================
    @Override
    public Page<Compilant> getCompilantsByUserIdPaged(Long userId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return compilantRepository.findByUser_Id(userId, pageable);
    }

    // =========================================================
    // 8. USER COUNTS
    // =========================================================
    @Override
    public long getTotalCompilantsByUserId(Long userId) {
        return compilantRepository.countByUser_Id(userId);
    }

    @Override
    public long getPendingCompilantsByUserId(Long userId) {
        return compilantRepository.countByUser_IdAndStatus(userId, "PENDING");
    }

    @Override
    public long getInProgressCompilantsByUserId(Long userId) {
        return compilantRepository.countByUser_IdAndStatus(userId, "IN_PROGRESS");
    }

    @Override
    public long getResolvedCompilantsByUserId(Long userId) {
        return compilantRepository.countByUser_IdAndStatus(userId, "RESOLVED");
    }

    // =========================================================
    // 9. SEARCH MY COMPLAINTS
    // =========================================================
    @Override
    public List<Compilant> searchCompilantsByUserId(Long userId, String keyword) {
        return compilantRepository
                .findByUser_IdAndCompilantTitleContainingIgnoreCaseOrUser_IdAndIssueTypeContainingIgnoreCaseOrUser_IdAndCategoryContainingIgnoreCaseOrUser_IdAndLocationContainingIgnoreCase(
                        userId, keyword,
                        userId, keyword,
                        userId, keyword,
                        userId, keyword
                );
    }

    // =========================================================
    // 10. FILTER MY COMPLAINTS
    // =========================================================
    @Override
    public List<Compilant> getCompilantsByUserIdAndStatus(Long userId, String status) {
        return compilantRepository.findByUser_IdAndStatus(userId, status);
    }

    @Override
    public List<Compilant> getCompilantsByUserIdAndPriority(Long userId, String priority) {
        return compilantRepository.findByUser_IdAndPriority(userId, priority);
    }

    @Override
    public List<Compilant> getCompilantsByUserIdAndCategory(Long userId, String category) {
        return compilantRepository.findByUser_IdAndCategory(userId, category);
    }

    // =========================================================
    // 11. ADMIN - GET ALL WITH PAGINATION
    // =========================================================
    @Override
    public Page<Compilant> getAllCompilantsPaged(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return compilantRepository.findAll(pageable);
    }

    // =========================================================
    // 12. ADMIN - SEARCH
    // =========================================================
    @Override
    public Page<Compilant> searchAllCompilants(String keyword, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return compilantRepository
                .findByCompilantCodeContainingIgnoreCaseOrCompilantTitleContainingIgnoreCaseOrLocationContainingIgnoreCase(
                        keyword, keyword, keyword, pageable
                );
    }

    // =========================================================
    // 13. ADMIN - FILTER
    // =========================================================
    @Override
    public Page<Compilant> filterCompilants(String category, String status, String priority, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);

        if (category != null && !category.isBlank() &&
            status != null && !status.isBlank() &&
            priority != null && !priority.isBlank()) {
            return compilantRepository.findByCategoryAndStatusAndPriority(category, status, priority, pageable);
        }

        if (category != null && !category.isBlank() &&
            status != null && !status.isBlank()) {
            return compilantRepository.findByCategoryAndStatus(category, status, pageable);
        }

        if (category != null && !category.isBlank() &&
            priority != null && !priority.isBlank()) {
            return compilantRepository.findByCategoryAndPriority(category, priority, pageable);
        }

        if (status != null && !status.isBlank() &&
            priority != null && !priority.isBlank()) {
            return compilantRepository.findByStatusAndPriority(status, priority, pageable);
        }

        if (category != null && !category.isBlank()) {
            return compilantRepository.findByCategory(category, pageable);
        }

        if (status != null && !status.isBlank()) {
            return compilantRepository.findByStatus(status, pageable);
        }

        if (priority != null && !priority.isBlank()) {
            return compilantRepository.findByPriority(priority, pageable);
        }

        return compilantRepository.findAll(pageable);
    }

    // =========================================================
    // 14. ASSIGN WORKER TO COMPLAINT
    // =========================================================
    @Override
    public Compilant assignWorkerToCompilant(Long compilantId, Long workerId) {

        Compilant compilant = compilantRepository.findById(compilantId)
                .orElseThrow(() ->
                        new RuntimeException("Complaint not found"));

        Worker worker = workerRepository.findById(workerId)
                .orElseThrow(() ->
                        new RuntimeException("Worker not found"));

        if ("ON_LEAVE".equalsIgnoreCase(worker.getWorkerStatus())) {
            throw new RuntimeException("Worker is currently on leave.");
        }

        compilant.setWorker(worker);
        compilant.setStatus("ASSIGNED");

        Integer active = worker.getActiveComplaints();

        if (active == null) {
            active = 0;
        }

        worker.setActiveComplaints(active + 1);
        worker.setWorkerStatus("BUSY");

        workerRepository.save(worker);

        Compilant saved = compilantRepository.save(compilant);

        createNotificationForCompilant(
                saved.getUser().getId(),
                "Your complaint has been assigned to "
                        + worker.getWorkerName());

        return saved;
    }
   
    // =========================================================
    // 15. UPDATE PRIORITY
    // =========================================================
    @Override
    public Compilant updateCompilantPriority(Long compilantId, String priority) {
        Compilant compilant = compilantRepository.findById(compilantId)
                .orElseThrow(() -> new RuntimeException("Complaint not found with id: " + compilantId));

        compilant.setPriority(priority);
        return compilantRepository.save(compilant);
    }
 // =========================================================
 // 16. UPDATE STATUS (ADMIN)
 // =========================================================
 @Override
 public Compilant updateCompilantStatus(Long compilantId, String status) {

     Compilant compilant = compilantRepository.findById(compilantId)
             .orElseThrow(() ->
                     new RuntimeException("Complaint not found with id : " + compilantId));

     compilant.setStatus(status);

     Compilant updatedCompilant = compilantRepository.save(compilant);

     if (updatedCompilant.getUser() != null) {

         createNotificationForCompilant(
                 updatedCompilant.getUser().getId(),
                 "Your complaint status has been updated to " + status
         );

     }

     return updatedCompilant;

 }
//=========================================================
//17. WORKER DASHBOARD
//=========================================================

@Override
public List<Compilant> getWorkerComplaints(Long workerId) {

  return compilantRepository.findByWorker_Id(workerId);

}

@Override
public long getWorkerTotalComplaints(Long workerId) {

  return compilantRepository.countByWorker_Id(workerId);

}

@Override
public long getWorkerPendingComplaints(Long workerId) {

  return compilantRepository.countByWorker_IdAndStatus(
          workerId,
          "PENDING"
  );

}

@Override
public long getWorkerInProgressComplaints(Long workerId) {

  return compilantRepository.countByWorker_IdAndStatus(
          workerId,
          "IN_PROGRESS"
  );

}

@Override
public long getWorkerResolvedComplaints(Long workerId) {

  return compilantRepository.countByWorker_IdAndStatus(
          workerId,
          "RESOLVED"
  );

}
//=========================================================
//18. WORKER UPDATE STATUS
//=========================================================

@Override
public Compilant updateWorkerComplaintStatus(
     Long complaintId,
     String status) {

 Compilant compilant = compilantRepository.findById(complaintId)
         .orElseThrow(() ->
                 new RuntimeException("Complaint not found"));

 compilant.setStatus(status);

 if ("RESOLVED".equalsIgnoreCase(status)
         && compilant.getWorker() != null) {

     Worker worker = compilant.getWorker();

     Integer active = worker.getActiveComplaints();

     if (active == null) {
         active = 0;
     }

     if (active > 0) {
         active--;
     }

     worker.setActiveComplaints(active);

     if (active == 0 &&
             !"ON_LEAVE".equalsIgnoreCase(worker.getWorkerStatus())) {

         worker.setWorkerStatus("AVAILABLE");

     }

     workerRepository.save(worker);

 }

 Compilant updated = compilantRepository.save(compilant);

 if (updated.getUser() != null) {

     createNotificationForCompilant(
             updated.getUser().getId(),
             "Worker updated your complaint status to " + status
     );

 }

 return updated;

}
//=========================================================
//19. WORKER DROPDOWN
//=========================================================

@Override
public List<WorkerDropdownDto> getAllWorkersForDropdown() {

 return workerRepository
         .findByWorkerStatusOrderByActiveComplaintsAsc("AVAILABLE")
         .stream()
         .map(worker ->
                 new WorkerDropdownDto(
                         worker.getId(),
                         worker.getWorkerName()))
         .toList();

}
}
 