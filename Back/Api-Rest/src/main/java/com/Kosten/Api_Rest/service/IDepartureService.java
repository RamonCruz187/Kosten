package com.Kosten.Api_Rest.service;

import com.Kosten.Api_Rest.dto.BaseResponse;
import com.Kosten.Api_Rest.dto.Departure.DepartureRequestDto;
import com.Kosten.Api_Rest.dto.Departure.DepartureResponseDto;
import com.Kosten.Api_Rest.dto.Departure.DepartureToBeListed;
import com.Kosten.Api_Rest.dto.Departure.DepartureToUpdateDto;
import com.Kosten.Api_Rest.dto.ExtendedBaseResponse;
import com.Kosten.Api_Rest.dto.user.UserResponseDto;
import com.Kosten.Api_Rest.dto.user.UserToBeListed;
import com.Kosten.Api_Rest.model.Departure;
import com.Kosten.Api_Rest.model.User;
import java.util.List;

public interface IDepartureService {
    ExtendedBaseResponse<List<DepartureToBeListed>> findAll();
    ExtendedBaseResponse<DepartureResponseDto> findById(Integer id);
    ExtendedBaseResponse<DepartureResponseDto> save(DepartureRequestDto departure);
    ExtendedBaseResponse<DepartureResponseDto> update(DepartureToUpdateDto departure);

    BaseResponse delete(Integer id);

    List<UserToBeListed> getUsersByDepartureId(Integer departureId);

    List<DepartureResponseDto> getAllDeparturesWithUsers();


    void addUserToDeparture(Long userId, Integer departureId);
    void removeUserFromDeparture(Integer departureId, Long userId);




}
