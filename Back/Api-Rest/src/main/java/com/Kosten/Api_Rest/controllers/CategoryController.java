package com.Kosten.Api_Rest.controllers;

import com.Kosten.Api_Rest.dto.BaseResponse;
import com.Kosten.Api_Rest.dto.ExtendedBaseResponse;
import com.Kosten.Api_Rest.dto.category.CategoryRequestDTO;
import com.Kosten.Api_Rest.dto.category.CategoryResponseDTO;
import com.Kosten.Api_Rest.dto.category.CategoryToUpdateDTO;
import com.Kosten.Api_Rest.service.CategoryService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Categoría", description = "Maneja todos los endpoints de categoría .")
@RestController
@RequestMapping("/category")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @PostMapping(value = "/new")
    @Transactional
    public ResponseEntity<ExtendedBaseResponse<CategoryResponseDTO>> newCategory(@RequestBody CategoryRequestDTO requestDto) {
        return ResponseEntity.status(200).body(categoryService.newCategory(requestDto));
    }

    @PutMapping("/update")
    @Transactional
    public ResponseEntity<ExtendedBaseResponse<CategoryResponseDTO>> updateCategory(@RequestBody CategoryToUpdateDTO requestDto) {
        return ResponseEntity.status(200).body(categoryService.updateCategory(requestDto));
    }

    @GetMapping("/all")
    @Transactional
    public ResponseEntity<ExtendedBaseResponse<List<CategoryResponseDTO>>> getAllCategories() {
        return ResponseEntity.status(200).body(categoryService.getAllCategories());
    }

    @GetMapping("/{id}")
    @Transactional
    public ResponseEntity<ExtendedBaseResponse<CategoryResponseDTO>> getCategoryById(@PathVariable Long id) {
        return ResponseEntity.status(200).body(categoryService.getCategory(id));
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<BaseResponse> deleteCategory(@PathVariable Long id) {
        return ResponseEntity.status(200).body(categoryService.deleteCategory(id));
    }
}
