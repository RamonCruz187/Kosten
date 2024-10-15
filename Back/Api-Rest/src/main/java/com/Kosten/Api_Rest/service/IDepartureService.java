package com.Kosten.Api_Rest.service;

import com.Kosten.Api_Rest.dto.BaseResponse;
import com.Kosten.Api_Rest.dto.Departure.DepartureRequestDto;
import com.Kosten.Api_Rest.dto.Departure.DepartureResponseDto;
import com.Kosten.Api_Rest.dto.Departure.DepartureToUpdateDto;
import com.Kosten.Api_Rest.dto.ExtendedBaseResponse;

import java.util.List;

public interface IDepartureService {
    ExtendedBaseResponse<List<DepartureResponseDto>> findAll();
    ExtendedBaseResponse<DepartureResponseDto> findById(Integer id);
    ExtendedBaseResponse<DepartureResponseDto> save(DepartureRequestDto departure);
    ExtendedBaseResponse<DepartureResponseDto> update(DepartureToUpdateDto departure);

    BaseResponse delete(Integer id);
}
