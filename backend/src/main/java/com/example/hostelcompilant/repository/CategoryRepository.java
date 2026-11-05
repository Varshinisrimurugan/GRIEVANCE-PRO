package com.example.hostelcompilant.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.hostelcompilant.entity.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    // SEARCH CATEGORY BY NAME
    Page<Category> findByCategoryNameContainingIgnoreCase(String keyword, Pageable pageable);
}