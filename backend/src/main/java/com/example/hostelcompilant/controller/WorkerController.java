package com.example.hostelcompilant.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.hostelcompilant.dto.WorkerDropdownDto;
import com.example.hostelcompilant.dto.WorkerResponseDto;
import com.example.hostelcompilant.dto.WorkerrequestDto;
import com.example.hostelcompilant.entity.Worker;
import com.example.hostelcompilant.service.WorkerService;

@RestController
@RequestMapping("/workers")
public class WorkerController {

    @Autowired
    private WorkerService workerService;

    // ==========================================
    // 1. ADD WORKER
    // URL: POST http://localhost:8081/workers
    // ==========================================
    @PostMapping
    public Worker createWorker(@RequestBody WorkerrequestDto workerrequestDto) {
        return workerService.createWorker(workerrequestDto);
    }

    // ==========================================
    // 2. GET ALL WORKERS
    // URL: GET http://localhost:8081/workers
    // ==========================================
    @GetMapping
    public List<WorkerResponseDto> getAllWorkers() {
        return workerService.getAllWorkers();
    }

    // ==========================================
    // 3. GET ALL WORKERS WITH PAGINATION
    // URL: GET http://localhost:8081/workers/paged?page=0&size=5
    // ==========================================
    @GetMapping("/paged")
    public Page<WorkerResponseDto> getAllWorkersPaged(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size
    ) {
        return workerService.getAllWorkersPaged(page, size);
    }

    // ==========================================
    // 4. GET WORKER BY ID
    // URL: GET http://localhost:8081/workers/{id}
    // ==========================================
    @GetMapping("/{id}")
    public WorkerResponseDto getWorkerById(@PathVariable Long id) {
        return workerService.getWorkerById(id);
    }

    // ==========================================
    // 5. SEARCH WORKERS
    // URL: GET http://localhost:8081/workers/search?keyword=ram&page=0&size=5
    // ==========================================
    @GetMapping("/search")
    public Page<WorkerResponseDto> searchWorkers(
            @RequestParam String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size
    ) {
        return workerService.searchWorkers(keyword, page, size);
    }

    // ==========================================
    // 6. FILTER WORKERS BY SPECIALIZATION
    // URL: GET http://localhost:8081/workers/filter?specialization=Plumber&page=0&size=5
    // ==========================================
    @GetMapping("/filter")
    public Page<WorkerResponseDto> filterWorkersBySpecialization(
            @RequestParam String specialization,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size
    ) {
        return workerService.filterWorkersBySpecialization(specialization, page, size);
    }

    // ==========================================
    // 7. UPDATE WORKER
    // URL: PUT http://localhost:8081/workers/{id}
    // ==========================================
    @PutMapping("/{id}")
    public Worker updateWorker(
            @PathVariable Long id,
            @RequestBody WorkerrequestDto workerrequestDto
    ) {
        return workerService.updateWorker(id, workerrequestDto);
    }

    // ==========================================
    // 8. DELETE WORKER
    // URL: DELETE http://localhost:8081/workers/{id}
    // ==========================================
    @DeleteMapping("/{id}")
    public String deleteWorker(@PathVariable Long id) {
        workerService.deleteWorker(id);
        return "Worker deleted successfully";
    }

    // ==========================================
    // 9. TOP CARD COUNTS - MANAGE WORKERS PAGE
    // ==========================================

    // TOTAL WORKERS
    // GET http://localhost:8081/workers/count/total
    @GetMapping("/count/total")
    public long getTotalWorkers() {
        return workerService.getTotalWorkers();
    }

    // ELECTRICIAN COUNT
    // GET http://localhost:8081/workers/count/electrician
    @GetMapping("/count/electrician")
    public long getElectricianCount() {
        return workerService.getElectricianCount();
    }

    // PLUMBER COUNT
    // GET http://localhost:8081/workers/count/plumber
    @GetMapping("/count/plumber")
    public long getPlumberCount() {
        return workerService.getPlumberCount();
    }

    // CLEANER COUNT
    // GET http://localhost:8081/workers/count/cleaner
    @GetMapping("/count/cleaner")
    public long getCleanerCount() {
        return workerService.getCleanerCount();
    }

    // ==========================================
    // 10. GET WORKERS FOR DROPDOWN
    // URL: GET http://localhost:8081/workers/dropdown
    // ==========================================
    @GetMapping("/dropdown")
    public List<WorkerDropdownDto> getWorkersForDropdown() {
        return workerService.getWorkersForDropdown();
    }
    
 // =========================================================
 // AVAILABLE WORKERS
 // =========================================================

 @GetMapping("/available")
 public ResponseEntity<List<WorkerResponseDto>> getAvailableWorkers() {

     return ResponseEntity.ok(

             workerService.getAvailableWorkers()

     );

 }


 // =========================================================
 // UPDATE WORKER STATUS
 // =========================================================

 @PutMapping("/{workerId}/status")
 public ResponseEntity<WorkerResponseDto> updateWorkerStatus(

         @PathVariable Long workerId,

         @RequestParam String workerStatus

 ) {

     return ResponseEntity.ok(

             workerService.updateWorkerStatus(

                     workerId,

                     workerStatus

             )

     );

 }
//=========================================================
//AVAILABLE WORKER COUNT
//=========================================================

@GetMapping("/available/count")
public ResponseEntity<Long> getAvailableWorkerCount() {

  return ResponseEntity.ok(

          workerService.getAvailableWorkerCount()

  );

}


//=========================================================
//BUSY WORKER COUNT
//=========================================================

@GetMapping("/busy/count")
public ResponseEntity<Long> getBusyWorkerCount() {

  return ResponseEntity.ok(

          workerService.getBusyWorkerCount()

  );

}


//=========================================================
//ON LEAVE WORKER COUNT
//=========================================================

@GetMapping("/onleave/count")
public ResponseEntity<Long> getOnLeaveWorkerCount() {

  return ResponseEntity.ok(

          workerService.getOnLeaveWorkerCount()

  );

}
 
}