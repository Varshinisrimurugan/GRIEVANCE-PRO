package com.example.hostelcompilant.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import com.example.hostelcompilant.dto.CategoryRequestDto;
import com.example.hostelcompilant.dto.IssueTypeRequestDto;
import com.example.hostelcompilant.entity.Category;
import com.example.hostelcompilant.entity.IssueType;
import com.example.hostelcompilant.service.CategoryService;

@RestController
@RequestMapping("/categories")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    // CATEGORY APIs
    
    // 1. ADD CATEGORY
    
    @PostMapping
    public Category createCategory(@RequestBody CategoryRequestDto categoryRequestDto) {
        return categoryService.createCategory(categoryRequestDto);
    }

    // 2. GET ALL CATEGORIES
    
    @GetMapping
    public List<Category> getAllCategories() {
        return categoryService.getAllCategories();
    }

    // 3. GET ALL CATEGORIES WITH PAGINATION
 
    @GetMapping("/paged")
    public Page<Category> getAllCategoriesPaged(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size
    ) {
        return categoryService.getAllCategoriesPaged(page, size);
    }

    // 4. GET CATEGORY BY ID
    
    @GetMapping("/{id}")
    public Category getCategoryById(@PathVariable Long id) {
        return categoryService.getCategoryById(id);
    }

    // 5. UPDATE CATEGORY
   
    @PutMapping("/{id}")
    public Category updateCategory(
            @PathVariable Long id,
            @RequestBody CategoryRequestDto categoryRequestDto
    ) {
        return categoryService.updateCategory(id, categoryRequestDto);
    }

    // 6. DELETE CATEGORY
   
    @DeleteMapping("/{id}")
    public String deleteCategory(@PathVariable Long id) {
        categoryService.deleteCategory(id);
        return "Category deleted successfully";
    }

    // 7. SEARCH CATEGORY
   
    @GetMapping("/search")
    public Page<Category> searchCategories(
            @RequestParam String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size
    ) {
        return categoryService.searchCategories(keyword, page, size);
    }

   
    // ISSUE TYPE APIs
   

    // 8. ADD ISSUE TYPE
   
    @PostMapping("/issue-types")
    public IssueType createIssueType(@RequestBody IssueTypeRequestDto issueTypeRequestDto) {
        return categoryService.createIssueType(issueTypeRequestDto);
    }

    // 9. GET ISSUE TYPES BY CATEGORY ID

    @GetMapping("/{categoryId}/issue-types")
    public List<IssueType> getIssueTypesByCategoryId(@PathVariable Long categoryId) {
        return categoryService.getIssueTypesByCategoryId(categoryId);
    }

    // 10. UPDATE ISSUE TYPE

    @PutMapping("/issue-types/{issueTypeId}")
    public IssueType updateIssueType(
            @PathVariable Long issueTypeId,
            @RequestBody IssueTypeRequestDto issueTypeRequestDto
    ) {
        return categoryService.updateIssueType(issueTypeId, issueTypeRequestDto);
    }

    // 11. DELETE ISSUE TYPE
  
    @DeleteMapping("/issue-types/{issueTypeId}")
    public String deleteIssueType(@PathVariable Long issueTypeId) {
        categoryService.deleteIssueType(issueTypeId);
        return "Issue type deleted successfully";
    }
}