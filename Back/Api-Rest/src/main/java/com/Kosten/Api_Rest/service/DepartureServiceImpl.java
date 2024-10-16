package com.Kosten.Api_Rest.service;

import com.Kosten.Api_Rest.dto.BaseResponse;
import com.Kosten.Api_Rest.dto.Departure.DepartureRequestDto;
import com.Kosten.Api_Rest.dto.Departure.DepartureResponseDto;
import com.Kosten.Api_Rest.dto.Departure.DepartureToUpdateDto;
import com.Kosten.Api_Rest.dto.ExtendedBaseResponse;
import com.Kosten.Api_Rest.Exception.DepartureNotFountException;
import com.Kosten.Api_Rest.mapper.DepartureMapper;
import com.Kosten.Api_Rest.model.Departure;
import com.Kosten.Api_Rest.repositoy.IDepartureRepository;
import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DepartureServiceImpl implements IDepartureService{

    @Autowired
    private IDepartureRepository departureRepository;
    @Autowired
    private DepartureMapper departureMapper;

    @Override
    @Transactional(readOnly = true)
    public ExtendedBaseResponse<List<DepartureResponseDto>> findAll() {
        List<Departure> departuresList = departureRepository.findAll();
        DepartureMapper departureMapper = Mappers.getMapper(DepartureMapper.class);
        List<DepartureResponseDto> departureResponseDto = departuresList.stream().map(departureMapper::departureToDepartureResponseDto).collect(Collectors.toList());
        return ExtendedBaseResponse.of(
                BaseResponse.ok("Departure list obtained successfully."), departureResponseDto
        );
    }

    @Override
    @Transactional(readOnly = true)
    public ExtendedBaseResponse<DepartureResponseDto> findById(Integer id) {
        Departure departure = departureRepository.findById(id).orElseThrow(
                () -> new DepartureNotFountException(id, Departure.class.getSimpleName())
        );
        DepartureResponseDto departureResponseDto = departureMapper.departureToDepartureResponseDto(departure);
        return ExtendedBaseResponse.of(
                BaseResponse.ok("Departure founded."),
                departureResponseDto
        );
    }

    @Override
    public ExtendedBaseResponse<DepartureResponseDto> save(DepartureRequestDto departureRequestDto) {
        Departure departure = departureMapper.toEntity(departureRequestDto);
        departureRepository.save(departure);
        DepartureResponseDto departureResponseDto = departureMapper.departureToDepartureResponseDto(departure);
        return ExtendedBaseResponse.of(
                BaseResponse.created("Departure created."),
                departureResponseDto
        );
    }



    @Override
    public ExtendedBaseResponse<DepartureResponseDto> update(DepartureToUpdateDto departureToUpdateDto) {
        Departure departure = departureRepository.findById(departureToUpdateDto.id()).orElseThrow(
                () -> new DepartureNotFountException()
        );
        DepartureMapper departureMapper = Mappers.getMapper(DepartureMapper.class);
        departure.setEndDate(departureToUpdateDto.endDate());
        departure.setEndTime(departureToUpdateDto.endTime());
        departure.setFinishPlace(departureToUpdateDto.finishPlace());
        departure.setStartDate(departureToUpdateDto.startDate());
        departure.setStartTime(departureToUpdateDto.startTime());
        departure.setMeetingPlace(departureToUpdateDto.meetingPlace());
        //departure.setUsersList();
        departureRepository.save(departure);
        return ExtendedBaseResponse.of(
                BaseResponse.ok("Departure updated."),
                departureMapper.departureToDepartureResponseDto(departure)
        );
    }

    @Override
    public BaseResponse delete(Integer id) {
        Departure departure = departureRepository.findById(id).orElseThrow(
                () -> new DepartureNotFountException(id, Departure.class.getSimpleName())
        );
        departureRepository.delete(departure);
        return BaseResponse.ok("Departure deleted");

    }


}
