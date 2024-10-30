package com.Kosten.Api_Rest.mapper;

import com.Kosten.Api_Rest.dto.category.CategoryRequestDTO;
import com.Kosten.Api_Rest.dto.category.CategoryResponseDTO;
import com.Kosten.Api_Rest.model.Category;
import org.mapstruct.Mapper;

@Mapper
public interface CategoryMapper {

    Category toEntity(CategoryRequestDTO categoryRequestDto);

    CategoryResponseDTO toDto(Category category);
}
