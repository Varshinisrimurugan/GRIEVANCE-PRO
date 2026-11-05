package com.example.hostelcompilant.service;

import java.util.List;

import org.springframework.data.domain.Page;

import com.example.hostelcompilant.dto.CategoryRequestDto;
import com.example.hostelcompilant.dto.IssueTypeRequestDto;
import com.example.hostelcompilant.entity.Category;
import com.example.hostelcompilant.entity.IssueType;

public interface CategoryService {

    // ==========================================
    // CATEGORY METHODS
    // ==========================================

    // ADD CATEGORY
    Category createCategory(CategoryRequestDto categoryRequestDto);

    // GET ALL CATEGORIES
    List<Category> getAllCategories();

    // GET ALL CATEGORIES WITH PAGINATION
    Page<Category> getAllCategoriesPaged(int page, int size);

    // GET CATEGORY BY ID
    Category getCategoryById(Long id);

    // UPDATE CATEGORY
    Category updateCategory(Long id, CategoryRequestDto categoryRequestDto);

    // DELETE CATEGORY
    void deleteCategory(Long id);

    // SEARCH CATEGORY
    Page<Category> searchCategories(String keyword, int page, int size);

    // ==========================================
    // ISSUE TYPE METHODS
    // ==========================================

    // ADD ISSUE TYPE
    IssueType createIssueType(IssueTypeRequestDto issueTypeRequestDto);

    // GET ISSUE TYPES BY CATEGORY ID
    List<IssueType> getIssueTypesByCategoryId(Long categoryId);

    // UPDATE ISSUE TYPE
    IssueType updateIssueType(Long issueTypeId, IssueTypeRequestDto issueTypeRequestDto);

    // DELETE ISSUE TYPE
    void deleteIssueType(Long issueTypeId);
}