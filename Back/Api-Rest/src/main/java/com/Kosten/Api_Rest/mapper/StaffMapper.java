package com.Kosten.Api_Rest.mapper;

import com.Kosten.Api_Rest.dto.staff.StaffRequestDto;
import com.Kosten.Api_Rest.dto.staff.StaffResponseDto;
import com.Kosten.Api_Rest.dto.staff.StaffToUpdateDto;
import com.Kosten.Api_Rest.model.Staff;
import org.mapstruct.Mapper;

@Mapper
public interface StaffMapper {

    StaffResponseDto toDto(Staff staff);

    Staff toEntity(StaffRequestDto staffRequestDto);

    Staff toEntity(StaffToUpdateDto staffToUpdateDto);
}
