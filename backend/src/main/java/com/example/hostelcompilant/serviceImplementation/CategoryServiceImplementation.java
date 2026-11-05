package com.example.hostelcompilant.serviceImplementation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.hostelcompilant.dto.CategoryRequestDto;
import com.example.hostelcompilant.dto.IssueTypeRequestDto;
import com.example.hostelcompilant.entity.Category;
import com.example.hostelcompilant.entity.IssueType;
import com.example.hostelcompilant.repository.CategoryRepository;
import com.example.hostelcompilant.repository.IssueTypeRepository;
import com.example.hostelcompilant.service.CategoryService;

@Service
public class CategoryServiceImplementation implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private IssueTypeRepository issueTypeRepository;

    // ==========================================
    // CATEGORY METHODS
    // ==========================================

    // ADD CATEGORY
    @Override
    public Category createCategory(CategoryRequestDto categoryRequestDto) {
        Category category = new Category();
        category.setCategoryName(categoryRequestDto.getCategory_name());
        return categoryRepository.save(category);
    }

    // GET ALL CATEGORIES
    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    // GET ALL CATEGORIES WITH PAGINATION
    @Override
    public Page<Category> getAllCategoriesPaged(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return categoryRepository.findAll(pageable);
    }

    // GET CATEGORY BY ID
    @Override
    public Category getCategoryById(Long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + id));
    }

    // UPDATE CATEGORY
    @Override
    public Category updateCategory(Long id, CategoryRequestDto categoryRequestDto) {
        Category existingCategory = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + id));

        existingCategory.setCategoryName(categoryRequestDto.getCategory_name());
        return categoryRepository.save(existingCategory);
    }

    // DELETE CATEGORY
    @Override
    public void deleteCategory(Long id) {
        Category existingCategory = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + id));

        categoryRepository.delete(existingCategory);
    }

    // SEARCH CATEGORY
    @Override
    public Page<Category> searchCategories(String keyword, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return categoryRepository.findByCategoryNameContainingIgnoreCase(keyword, pageable);
    }

    // ==========================================
    // ISSUE TYPE METHODS
    // ==========================================

    // ADD ISSUE TYPE
    @Override
    public IssueType createIssueType(IssueTypeRequestDto issueTypeRequestDto) {
        Category category = categoryRepository.findById(issueTypeRequestDto.getCategory_id())
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + issueTypeRequestDto.getCategory_id()));

        IssueType issueType = new IssueType();
        issueType.setIssueName(issueTypeRequestDto.getIssue_name());
        issueType.setCategory(category);

        return issueTypeRepository.save(issueType);
    }

    // GET ISSUE TYPES BY CATEGORY ID
    @Override
    public List<IssueType> getIssueTypesByCategoryId(Long categoryId) {
        return issueTypeRepository.findByCategory_Id(categoryId);
    }

    // UPDATE ISSUE TYPE
    @Override
    public IssueType updateIssueType(Long issueTypeId, IssueTypeRequestDto issueTypeRequestDto) {
        IssueType existingIssueType = issueTypeRepository.findById(issueTypeId)
                .orElseThrow(() -> new RuntimeException("IssueType not found with id: " + issueTypeId));

        existingIssueType.setIssueName(issueTypeRequestDto.getIssue_name());

        if (issueTypeRequestDto.getCategory_id() != null) {
            Category category = categoryRepository.findById(issueTypeRequestDto.getCategory_id())
                    .orElseThrow(() -> new RuntimeException("Category not found with id: " + issueTypeRequestDto.getCategory_id()));
            existingIssueType.setCategory(category);
        }

        return issueTypeRepository.save(existingIssueType);
    }

    // DELETE ISSUE TYPE
    @Override
    public void deleteIssueType(Long issueTypeId) {
        IssueType existingIssueType = issueTypeRepository.findById(issueTypeId)
                .orElseThrow(() -> new RuntimeException("IssueType not found with id: " + issueTypeId));

        issueTypeRepository.delete(existingIssueType);
    }
}