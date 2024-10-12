package com.Kosten.Api_Rest.service;

import com.Kosten.Api_Rest.dto.BaseResponse;
import com.Kosten.Api_Rest.dto.ExtendedBaseResponse;
import com.Kosten.Api_Rest.dto.staff.StaffRequestDto;
import com.Kosten.Api_Rest.dto.staff.StaffResponseDto;
import com.Kosten.Api_Rest.dto.staff.StaffToUpdateDto;
import com.Kosten.Api_Rest.model.Staff;

import java.util.List;

public interface StaffService {

    ExtendedBaseResponse<StaffResponseDto> newStaff(StaffRequestDto staffRequestDto);

    ExtendedBaseResponse<StaffResponseDto> updateStaff(StaffToUpdateDto staffToUpdateDto);

    ExtendedBaseResponse<StaffResponseDto> getStaff(Long id);

    ExtendedBaseResponse<List<StaffResponseDto>>  getAllStaff();

    BaseResponse deleteStaff(Long id);
}
