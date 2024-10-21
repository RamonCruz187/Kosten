package com.Kosten.Api_Rest.service;

import com.Kosten.Api_Rest.dto.BaseResponse;
import com.Kosten.Api_Rest.dto.ExtendedBaseResponse;
import com.Kosten.Api_Rest.dto.category.CategoryRequestDTO;
import com.Kosten.Api_Rest.dto.category.CategoryResponseDTO;
import com.Kosten.Api_Rest.dto.category.CategoryToUpdateDTO;

import java.util.List;

public interface CategoryService {
    ExtendedBaseResponse<CategoryResponseDTO> newCategory(CategoryRequestDTO categoryRequestDto);

    ExtendedBaseResponse<CategoryResponseDTO> updateCategory(CategoryToUpdateDTO categoryToUpdateDto);

    ExtendedBaseResponse<List<CategoryResponseDTO>> getAllCategories();

    ExtendedBaseResponse<CategoryResponseDTO> getCategory(Long id);

    BaseResponse deleteCategory(Long id);

}
