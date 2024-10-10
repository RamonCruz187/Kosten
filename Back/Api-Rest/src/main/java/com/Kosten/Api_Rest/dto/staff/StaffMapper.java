package com.Kosten.Api_Rest.dto.staff;

import com.Kosten.Api_Rest.model.Staff;
import org.mapstruct.Mapper;

@Mapper
public interface StaffMapper {

    StaffResponseDto toDto(Staff staff);

    Staff toEntity(StaffRequestDto staffRequestDto);
}
