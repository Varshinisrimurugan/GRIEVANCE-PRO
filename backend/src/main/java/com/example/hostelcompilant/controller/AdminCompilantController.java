package com.example.hostelcompilant.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import com.example.hostelcompilant.dto.AdminCompilantResponseDto;
import com.example.hostelcompilant.dto.AssignWorkerRequestDto;
import com.example.hostelcompilant.dto.UpdateCompilantStatusRequestDto;
import com.example.hostelcompilant.entity.Compilant;
import com.example.hostelcompilant.service.AdminCompilantService;

@RestController
@RequestMapping("/admin/complaints")
public class AdminCompilantController {

    @Autowired
    private AdminCompilantService adminCompilantService;

   
    // 1. GET ALL COMPLAINTS WITH PAGINATION
    
    @GetMapping
    public Page<AdminCompilantResponseDto> getAllComplaints(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size
    ) {
        System.out.println("INSIDE GET ALL ADMIN COMPLAINTS API");
        return adminCompilantService.getAllComplaints(page, size);
    }

    // 2. GET COMPLAINT BY ID
   
    @GetMapping("/{id}")
    public AdminCompilantResponseDto getComplaintById(@PathVariable Long id) {
        System.out.println("INSIDE GET ADMIN COMPLAINT BY ID API");
        return adminCompilantService.getComplaintById(id);
    }

   
    // 3. SEARCH COMPLAINTS

    // Search by complaint code / title / location

    @GetMapping("/search")
    public Page<AdminCompilantResponseDto> searchComplaints(
            @RequestParam String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size
    ) {
        System.out.println("INSIDE SEARCH ADMIN COMPLAINT API");
        return adminCompilantService.searchComplaints(keyword, page, size);
    }


    // 4. FILTER COMPLAINTS
   
    @GetMapping("/filter")
    public Page<AdminCompilantResponseDto> filterComplaints(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String priority,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size
    ) {
        System.out.println("INSIDE FILTER ADMIN COMPLAINT API");
        return adminCompilantService.filterComplaints(category, status, priority, page, size);
    }

   
    // 5. ASSIGN WORKER TO COMPLAINT
  
    @PutMapping("/{id}/assign-worker")
    public Compilant assignWorkerToComplaint(
            @PathVariable Long id,
            @RequestBody AssignWorkerRequestDto requestDto
    ) {
        System.out.println("INSIDE ADMIN ASSIGN WORKER API");
        return adminCompilantService.assignWorkerToComplaint(id, requestDto);
    }

 
    // 6. UPDATE COMPLAINT STATUS
   
    @PutMapping("/{id}/status")
    public Compilant updateComplaintStatus(
            @PathVariable Long id,
            @RequestBody UpdateCompilantStatusRequestDto requestDto
    ) {
        System.out.println("INSIDE ADMIN UPDATE STATUS API");
        return adminCompilantService.updateComplaintStatus(id, requestDto);
    }
}