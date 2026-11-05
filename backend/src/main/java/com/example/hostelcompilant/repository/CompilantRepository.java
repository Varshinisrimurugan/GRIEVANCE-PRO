package com.example.hostelcompilant.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.hostelcompilant.entity.Compilant;

@Repository
public interface CompilantRepository extends JpaRepository<Compilant, Long> {

    // =========================================================
    // FOR COMPLAINT CODE GENERATION
    // =========================================================
    Compilant findTopByOrderByIdDesc();

    // =========================================================
    // DASHBOARD COUNTS
    // =========================================================
    long countByStatus(String status);

    // =========================================================
    // USER SIDE - MY COMPLAINTS
    // =========================================================

    // GET ALL COMPLAINTS OF ONE USER
    List<Compilant> findByUser_Id(Long userId);

    // USER TOP CARD COUNTS
    long countByUser_Id(Long userId);
    long countByUser_IdAndStatus(Long userId, String status);

    // SEARCH MY COMPLAINTS
    List<Compilant> findByUser_IdAndCompilantTitleContainingIgnoreCaseOrUser_IdAndIssueTypeContainingIgnoreCaseOrUser_IdAndCategoryContainingIgnoreCaseOrUser_IdAndLocationContainingIgnoreCase(
            Long userId1, String compilantTitle,
            Long userId2, String issueType,
            Long userId3, String category,
            Long userId4, String location
    );

    // FILTER MY COMPLAINTS
    List<Compilant> findByUser_IdAndStatus(Long userId, String status);
    List<Compilant> findByUser_IdAndPriority(Long userId, String priority);
    List<Compilant> findByUser_IdAndCategory(Long userId, String category);

    // PAGINATION - USER SIDE
    Page<Compilant> findByUser_Id(Long userId, Pageable pageable);

    // =========================================================
    // WORKER SIDE - ASSIGNED COMPLAINTS
    // =========================================================

    // GET ALL COMPLAINTS ASSIGNED TO ONE WORKER
    List<Compilant> findByWorker_Id(Long workerId);

    // FILTER WORKER COMPLAINTS BY STATUS
    List<Compilant> findByWorker_IdAndStatus(Long workerId, String status);

    // WORKER DASHBOARD COUNTS
    long countByWorker_Id(Long workerId);
    long countByWorker_IdAndStatus(Long workerId, String status);

    // =========================================================
    // ADMIN SIDE - MANAGE COMPLAINTS
    // =========================================================

    // ADMIN SEARCH
    Page<Compilant> findByCompilantCodeContainingIgnoreCaseOrCompilantTitleContainingIgnoreCaseOrLocationContainingIgnoreCase(
            String compilantCode,
            String compilantTitle,
            String location,
            Pageable pageable
    );

    // ADMIN FILTER
    Page<Compilant> findByCategory(String category, Pageable pageable);
    Page<Compilant> findByStatus(String status, Pageable pageable);
    Page<Compilant> findByPriority(String priority, Pageable pageable);

    Page<Compilant> findByCategoryAndStatus(String category, String status, Pageable pageable);
    Page<Compilant> findByCategoryAndPriority(String category, String priority, Pageable pageable);
    Page<Compilant> findByStatusAndPriority(String status, String priority, Pageable pageable);
    Page<Compilant> findByCategoryAndStatusAndPriority(String category, String status, String priority, Pageable pageable);

    // =========================================================
    // REPORTS & ANALYTICS
    // =========================================================

    // COMPLAINT COUNT BY STATUS
    @Query("SELECT c.status, COUNT(c) FROM Compilant c GROUP BY c.status")
    List<Object[]> getComplaintCountByStatus();

    // COMPLAINT COUNT BY PRIORITY
    @Query("SELECT c.priority, COUNT(c) FROM Compilant c GROUP BY c.priority")
    List<Object[]> getComplaintCountByPriority();

    // COMPLAINT COUNT BY CATEGORY
    @Query("SELECT c.category, COUNT(c) FROM Compilant c GROUP BY c.category")
    List<Object[]> getComplaintCountByCategory();
}