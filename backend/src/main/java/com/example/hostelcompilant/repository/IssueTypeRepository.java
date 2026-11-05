package com.example.hostelcompilant.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.hostelcompilant.entity.IssueType;

public interface IssueTypeRepository extends JpaRepository<IssueType, Long> {

    // GET ALL ISSUE TYPES OF ONE CATEGORY
    List<IssueType> findByCategory_Id(Long categoryId);

    // PAGINATION - ISSUE TYPES OF ONE CATEGORY
    Page<IssueType> findByCategory_Id(Long categoryId, Pageable pageable);

    // SEARCH ISSUE TYPE BY ISSUE NAME
    Page<IssueType> findByIssueNameContainingIgnoreCase(String keyword, Pageable pageable);

    // SEARCH ISSUE TYPE INSIDE ONE CATEGORY
    Page<IssueType> findByCategory_IdAndIssueNameContainingIgnoreCase(Long categoryId, String keyword, Pageable pageable);
}