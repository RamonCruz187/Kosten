package com.Kosten.Api_Rest.service.impl;

import com.Kosten.Api_Rest.dto.BaseResponse;
import com.Kosten.Api_Rest.dto.ExtendedBaseResponse;
import com.Kosten.Api_Rest.dto.category.CategoryRequestDTO;
import com.Kosten.Api_Rest.dto.category.CategoryResponseDTO;
import com.Kosten.Api_Rest.dto.category.CategoryToUpdateDTO;
import com.Kosten.Api_Rest.mapper.CategoryMapper;
import com.Kosten.Api_Rest.model.Category;
import com.Kosten.Api_Rest.repository.CategoryRepository;
import com.Kosten.Api_Rest.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.mapstruct.factory.Mappers;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    @Override
    public ExtendedBaseResponse<CategoryResponseDTO> newCategory(CategoryRequestDTO categoryRequestDto) {
        try {
            CategoryMapper categoryMapper = Mappers.getMapper(CategoryMapper.class);
            Category category = categoryMapper.toEntity(categoryRequestDto);
            categoryRepository.save(category);
            return ExtendedBaseResponse.of(
                    BaseResponse.created("Categoría creada exitosamente"), categoryMapper.toDto(category)
            );
        }catch (Exception e){
            throw new RuntimeException(e.getMessage());
        }

    }

    @Override
    public ExtendedBaseResponse<CategoryResponseDTO> updateCategory(CategoryToUpdateDTO categoryToUpdateDto) {
        Category category = categoryRepository.findById(categoryToUpdateDto.id()).orElseThrow(() -> new IllegalArgumentException("Category not found"));
        CategoryMapper categoryMapper = Mappers.getMapper(CategoryMapper.class);
        category.setName(categoryToUpdateDto.name());
        categoryRepository.save(category);
        return ExtendedBaseResponse.of(
                BaseResponse.ok("Categoría actualizada exitosamente"), categoryMapper.toDto(category)
        );
    }

    @Override
    public ExtendedBaseResponse<List<CategoryResponseDTO>> getAllCategories() {
        try {
            List<Category> categories = categoryRepository.findAll();
            CategoryMapper categoryMapper = Mappers.getMapper(CategoryMapper.class);
            List<CategoryResponseDTO> categoryResponseDto = categories.stream().map(categoryMapper::toDto).toList();
            return ExtendedBaseResponse.of(
                    BaseResponse.ok("Categorías listadas exitosamente"), categoryResponseDto
            );
        }catch (Exception e){
            throw new RuntimeException(e.getMessage());
        }

    }

    @Override
    public ExtendedBaseResponse<CategoryResponseDTO> getCategory(Long id) {
        Category category = categoryRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Category not found"));
        CategoryMapper categoryMapper = Mappers.getMapper(CategoryMapper.class);
        CategoryResponseDTO categoryResponseDto = categoryMapper.toDto(category);
        return ExtendedBaseResponse.of(
                BaseResponse.ok("Categoría encontrada exitosamente"), categoryResponseDto
        );
    }

    @Override
    public BaseResponse deleteCategory(Long id) {
        Category category = categoryRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Category not found"));
        categoryRepository.delete(category);
        return BaseResponse.ok("Categoría eliminada exitosamente");
    }

    @Override
    public Category getCategoryByName(String name) {
        return categoryRepository.findByName(name);
    }
}
