package com.example.hostelcompilant.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.hostelcompilant.entity.Worker;

@Repository
public interface WorkerRepository extends JpaRepository<Worker, Long> {

    // =========================================================
    // SEARCH BY WORKER NAME OR SPECIALIZATION
    // =========================================================
    Page<Worker> findByWorkerNameContainingIgnoreCaseOrSpecializationContainingIgnoreCase(
            String workerName,
            String specialization,
            Pageable pageable
    );

    // =========================================================
    // FILTER BY SPECIALIZATION
    // =========================================================
    Page<Worker> findBySpecializationIgnoreCase(
            String specialization,
            Pageable pageable
    );

    // =========================================================
    // TOP CARD COUNTS
    // =========================================================
    long countBySpecializationIgnoreCase(String specialization);

    // =========================================================
    // WORKER PERFORMANCE REPORT
    // =========================================================
    @Query("""
        SELECT
            w.id,
            w.workerName,
            w.specialization,
            COUNT(c.id),
            SUM(CASE WHEN c.status = 'RESOLVED' THEN 1 ELSE 0 END),
            SUM(CASE WHEN c.status = 'PENDING'
                      OR c.status = 'IN_PROGRESS'
                      OR c.status = 'ASSIGNED'
                     THEN 1 ELSE 0 END)
        FROM Worker w
        LEFT JOIN w.compilants c
        GROUP BY w.id, w.workerName, w.specialization
    """)
    List<Object[]> getWorkerPerformanceReport();

    // =========================================================
    // WORKER AVAILABILITY
    // =========================================================

    // Get workers by status
    List<Worker> findByWorkerStatus(String workerStatus);

    // Available workers sorted by least active complaints
    List<Worker> findByWorkerStatusOrderByActiveComplaintsAsc(
            String workerStatus
    );

    // Count workers by status
    long countByWorkerStatus(String workerStatus);

    // =========================================================
    // ACTIVE COMPLAINTS
    // =========================================================

    List<Worker> findByActiveComplaintsLessThan(Integer activeComplaints);

}