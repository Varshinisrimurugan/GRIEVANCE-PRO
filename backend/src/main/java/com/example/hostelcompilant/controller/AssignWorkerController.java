package com.example.hostelcompilant.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.hostelcompilant.dto.AssignWorkerRequestDto;
import com.example.hostelcompilant.dto.AssignWorkerResponseDto;
import com.example.hostelcompilant.service.AssignWorkerService;

@RestController
@RequestMapping("/assign-worker")
public class AssignWorkerController {

    @Autowired
    private AssignWorkerService assignWorkerService;

    // ASSIGN WORKER TO COMPLAINT
    // PUT http://localhost:8081/assign-worker/{compilantId}
    @PutMapping("/{compilantId}")
    public AssignWorkerResponseDto assignWorker(
            @PathVariable Long compilantId,
            @RequestBody AssignWorkerRequestDto requestDto) {
        return assignWorkerService.assignWorker(compilantId, requestDto);
    }

    // GET ALL ASSIGNMENTS
    // GET http://localhost:8081/assign-worker
    @GetMapping
    public List<AssignWorkerResponseDto> getAllAssignments() {
        return assignWorkerService.getAllAssignments();
    }

    // GET ASSIGNMENTS BY WORKER ID
    // GET http://localhost:8081/assign-worker/worker/1
    @GetMapping("/worker/{workerId}")
    public List<AssignWorkerResponseDto> getAssignmentsByWorkerId(@PathVariable Long workerId) {
        return assignWorkerService.getAssignmentsByWorkerId(workerId);
    }

    // DELETE ASSIGNMENT
    // DELETE http://localhost:8081/assign-worker/1
    @DeleteMapping("/{id}")
    public String deleteAssignment(@PathVariable Long id) {
        assignWorkerService.deleteAssignment(id);
        return "Assignment deleted successfully";
    }
}