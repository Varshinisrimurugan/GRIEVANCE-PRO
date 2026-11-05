package com.example.hostelcompilant.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import com.example.hostelcompilant.dto.CompilantRequestDto;
import com.example.hostelcompilant.dto.WorkerDropdownDto;
import com.example.hostelcompilant.entity.Compilant;
import com.example.hostelcompilant.service.CompilantService;
import org.springframework.http.MediaType;
import org.springframework.web.multipart.MultipartFile;
@RestController
@RequestMapping("/compilants")
public class CompilantController {

    @Autowired
    private CompilantService compilantService;

    
 // =========================================================
 // CREATE COMPLAINT WITH PHOTO UPLOAD
 // =========================================================
    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public String uploadComplaint(

    		
    		        @RequestParam("category") String category,
    		        @RequestParam("issue_type") String issueType,
    		        @RequestParam("block_name") String blockName,
    		        @RequestParam("floor_number") String floorNumber,
    		        @RequestParam("room_number") String roomNumber,
    		        @RequestParam("compilant_title") String compilantTitle,
    		        @RequestParam("location") String location,
    		        @RequestParam("description") String description,
    		        @RequestParam("priority") String priority,
    		        @RequestParam("user_id") Long userId,

    		        @RequestParam(value = "photo", required = false) MultipartFile photo

    		) throws Exception { 
        compilantService.createCompilantWithPhoto(
                category,
                issueType,
                blockName,
                floorNumber,
                roomNumber,
                compilantTitle,
                location,
                description,
                priority,
                userId,
                photo
        );

        return "Complaint with photo uploaded successfully";
    }

   
    // CREATE COMPLAINT USING DTO
    
    @PostMapping
    public String createComplaint(@RequestBody CompilantRequestDto compilantRequestDto) {
        compilantService.createComplaint(compilantRequestDto);
        return "Complaint created successfully";
    }

    // GET ALL COMPLAINTS
 
    @GetMapping
    public List<Compilant> getAllCompilants() {
        return compilantService.getAllCompilants();
    }

    // GET COMPLAINT BY ID
   
    @GetMapping("/{id}")
    public Compilant getCompilantById(@PathVariable Long id) {
        return compilantService.getCompilantById(id);
    }


    // DELETE COMPLAINT

    @DeleteMapping("/{id}")
    public String deleteCompilant(@PathVariable Long id) {
        compilantService.deleteCompilant(id);
        return "Complaint deleted successfully";
    }

   
    // GET COMPLAINTS BY USER ID
 
    @GetMapping("/user/{userId}")
    public List<Compilant> getComplaintsByUserId(@PathVariable Long userId) {
        return compilantService.getComplaintsByUserId(userId);
    }

    
    // USER SIDE PAGINATION

    @GetMapping("/user/{userId}/paged")
    public Page<Compilant> getCompilantsByUserIdPaged(
            @PathVariable Long userId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {
        return compilantService.getCompilantsByUserIdPaged(userId, page, size);
    }

    // USER SIDE COUNTS
    @GetMapping("/user/{userId}/count/total")
    public long getTotalCompilantsByUserId(@PathVariable Long userId) {
        return compilantService.getTotalCompilantsByUserId(userId);
    }

    @GetMapping("/user/{userId}/count/pending")
    public long getPendingCompilantsByUserId(@PathVariable Long userId) {
        return compilantService.getPendingCompilantsByUserId(userId);
    }

    @GetMapping("/user/{userId}/count/in-progress")
    public long getInProgressCompilantsByUserId(@PathVariable Long userId) {
        return compilantService.getInProgressCompilantsByUserId(userId);
    }

    @GetMapping("/user/{userId}/count/resolved")
    public long getResolvedCompilantsByUserId(@PathVariable Long userId) {
        return compilantService.getResolvedCompilantsByUserId(userId);
    }

    // SEARCH MY COMPLAINTS
 
    @GetMapping("/user/{userId}/search")
    public List<Compilant> searchCompilantsByUserId(
            @PathVariable Long userId,
            @RequestParam String keyword) {
        return compilantService.searchCompilantsByUserId(userId, keyword);
    }


    // FILTER MY COMPLAINTS

    @GetMapping("/user/{userId}/status/{status}")
    public List<Compilant> getCompilantsByUserIdAndStatus(
            @PathVariable Long userId,
            @PathVariable String status) {
        return compilantService.getCompilantsByUserIdAndStatus(userId, status);
    }

    @GetMapping("/user/{userId}/priority/{priority}")
    public List<Compilant> getCompilantsByUserIdAndPriority(
            @PathVariable Long userId,
            @PathVariable String priority) {
        return compilantService.getCompilantsByUserIdAndPriority(userId, priority);
    }

    @GetMapping("/user/{userId}/category/{category}")
    public List<Compilant> getCompilantsByUserIdAndCategory(
            @PathVariable Long userId,
            @PathVariable String category) {
        return compilantService.getCompilantsByUserIdAndCategory(userId, category);
    }

  
    // ADMIN - GET ALL WITH PAGINATION
    
    @GetMapping("/paged")
    public Page<Compilant> getAllCompilantsPaged(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return compilantService.getAllCompilantsPaged(page, size);
    }

   
    // ADMIN - SEARCH
   
    @GetMapping("/search")
    public Page<Compilant> searchAllCompilants(
            @RequestParam String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return compilantService.searchAllCompilants(keyword, page, size);
    }

    
    // ADMIN - FILTER
  
    @GetMapping("/filter")
    public Page<Compilant> filterCompilants(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String priority,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return compilantService.filterCompilants(category, status, priority, page, size);
    }

    // ADMIN - ASSIGN WORKER
  
    @PutMapping("/{compilantId}/assign-worker/{workerId}")
    public Compilant assignWorkerToCompilant(
            @PathVariable Long compilantId,
            @PathVariable Long workerId) {
        return compilantService.assignWorkerToCompilant(compilantId, workerId);
    }

 
    // ADMIN - UPDATE PRIORITY
    
    @PatchMapping("/{compilantId}/priority")
    public Compilant updateCompilantPriority(
            @PathVariable Long compilantId,
            @RequestParam String priority) {
        return compilantService.updateCompilantPriority(compilantId, priority);
    }

    
    // ADMIN - UPDATE STATUS
   
    @PatchMapping("/{compilantId}/status")
    public Compilant updateCompilantStatus(
            @PathVariable Long compilantId,
            @RequestParam String status) {
        return compilantService.updateCompilantStatus(compilantId, status);
    }
 // =========================================================
 // WORKER DASHBOARD
 // =========================================================

 // Get all complaints assigned to a worker
 @GetMapping("/worker/{workerId}")
 public List<Compilant> getWorkerComplaints(@PathVariable Long workerId) {
     return compilantService.getWorkerComplaints(workerId);
 }

 // Worker dashboard counts
 @GetMapping("/worker/{workerId}/count/total")
 public long getWorkerTotalComplaints(@PathVariable Long workerId) {
     return compilantService.getWorkerTotalComplaints(workerId);
 }

 @GetMapping("/worker/{workerId}/count/pending")
 public long getWorkerPendingComplaints(@PathVariable Long workerId) {
     return compilantService.getWorkerPendingComplaints(workerId);
 }

 @GetMapping("/worker/{workerId}/count/in-progress")
 public long getWorkerInProgressComplaints(@PathVariable Long workerId) {
     return compilantService.getWorkerInProgressComplaints(workerId);
 }

 @GetMapping("/worker/{workerId}/count/resolved")
 public long getWorkerResolvedComplaints(@PathVariable Long workerId) {
     return compilantService.getWorkerResolvedComplaints(workerId);
 }

 // Worker updates complaint status
 @PatchMapping("/worker/{complaintId}/status")
 public Compilant updateWorkerComplaintStatus(
         @PathVariable Long complaintId,
         @RequestParam String status) {

     return compilantService.updateWorkerComplaintStatus(complaintId, status);
 }
   
    // WORKER DROPDOWN
  
    @GetMapping("/workers/dropdown")
    public List<WorkerDropdownDto> getAllWorkersForDropdown() {
        return compilantService.getAllWorkersForDropdown();
    }
}