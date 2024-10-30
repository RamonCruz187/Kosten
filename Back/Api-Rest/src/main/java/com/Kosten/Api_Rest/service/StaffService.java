package com.Kosten.Api_Rest.service;

import com.Kosten.Api_Rest.dto.BaseResponse;
import com.Kosten.Api_Rest.dto.ExtendedBaseResponse;
import com.Kosten.Api_Rest.dto.staff.StaffRequestDto;
import com.Kosten.Api_Rest.dto.staff.StaffResponseDto;
import com.Kosten.Api_Rest.dto.staff.StaffToUpdateDto;
import com.Kosten.Api_Rest.model.Staff;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface StaffService {

    ExtendedBaseResponse<StaffResponseDto> newStaff(StaffRequestDto staffRequestDto, MultipartFile file);

    ExtendedBaseResponse<StaffResponseDto> updateStaff(StaffToUpdateDto staffToUpdateDto, MultipartFile file);

    ExtendedBaseResponse<StaffResponseDto> getStaff(Long id);

    ExtendedBaseResponse<List<StaffResponseDto>>  getAllStaff();

    BaseResponse deleteStaff(Long id);
}
