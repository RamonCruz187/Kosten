package com.Kosten.Api_Rest.service.impl;

import com.Kosten.Api_Rest.Exception.packagesExc.PackageNotFoundException;
import com.Kosten.Api_Rest.dto.BaseResponse;
import com.Kosten.Api_Rest.dto.Departure.DepartureRequestDto;
import com.Kosten.Api_Rest.dto.Departure.DepartureResponseDto;
import com.Kosten.Api_Rest.dto.Departure.DepartureToUpdateDto;
import com.Kosten.Api_Rest.dto.ExtendedBaseResponse;
import com.Kosten.Api_Rest.Exception.DepartureNotFoundException;
import com.Kosten.Api_Rest.mapper.DepartureMapper;
import com.Kosten.Api_Rest.model.Departure;
import com.Kosten.Api_Rest.model.Package;
import com.Kosten.Api_Rest.repository.PackageRepository;
import com.Kosten.Api_Rest.repository.IDepartureRepository;
import com.Kosten.Api_Rest.service.IDepartureService;
import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DepartureServiceImpl implements IDepartureService {

    @Autowired
    private IDepartureRepository departureRepository;
    @Autowired
    private DepartureMapper departureMapper;
    @Autowired
    private PackageRepository packageRepository;

    @Override
    @Transactional(readOnly = true)
    public ExtendedBaseResponse<List<DepartureResponseDto>> findAll() {
        List<Departure> departuresList = departureRepository.findAll();
        DepartureMapper departureMapper = Mappers.getMapper(DepartureMapper.class);
        List<DepartureResponseDto> departureResponseDto = departuresList.stream().map(departureMapper::departureToDepartureResponseDto).collect(Collectors.toList());
        return ExtendedBaseResponse.of(
                BaseResponse.ok("Lista de salidas obtenida."), departureResponseDto
        );
    }

    @Override
    @Transactional(readOnly = true)
    public ExtendedBaseResponse<DepartureResponseDto> findById(Integer id) {
        Departure departure = departureRepository.findById(id).orElseThrow(
                () -> new DepartureNotFoundException(id, Departure.class.getSimpleName())
        );
        DepartureResponseDto departureResponseDto = departureMapper.departureToDepartureResponseDto(departure);
        return ExtendedBaseResponse.of(
                BaseResponse.ok("Salida encontrada."),
                departureResponseDto
        );
    }

    @Override
    public ExtendedBaseResponse<DepartureResponseDto> save(DepartureRequestDto departureRequestDto) {
        Long packageId = departureRequestDto.getPackageId();

        Package existingPackage = packageRepository.findById(packageId)
                .orElseThrow(() -> new PackageNotFoundException());

        Departure departure = departureMapper.toEntity(departureRequestDto);

        existingPackage.addDeparture(departure);

        packageRepository.save(existingPackage);
        departureRepository.save(departure);
        DepartureResponseDto departureResponseDto = departureMapper.departureToDepartureResponseDto(departure);

        return ExtendedBaseResponse.of(
                BaseResponse.created("Salida creada."),
                departureResponseDto
        );
    }




    @Override
    public ExtendedBaseResponse<DepartureResponseDto> update(DepartureToUpdateDto departureToUpdateDto) {
        Departure departure = departureRepository.findById(departureToUpdateDto.id()).orElseThrow(
                () -> new DepartureNotFoundException()
        );
        DepartureMapper departureMapper = Mappers.getMapper(DepartureMapper.class);
        departure.setPrice(departureToUpdateDto.price());
        departure.setEndDate(departureToUpdateDto.endDate());
        departure.setFinishPlace(departureToUpdateDto.finishPlace());
        departure.setStartDate(departureToUpdateDto.startDate());
        departure.setMeetingPlace(departureToUpdateDto.meetingPlace());
        departure.setQuota(departureToUpdateDto.quota());
        departure.setIsActive(departureToUpdateDto.isActive());
        /*departure.setUsersList(departureToUpdateDto.usersList());*/
        departureRepository.save(departure);
        return ExtendedBaseResponse.of(
                BaseResponse.ok("Salida actualizada."),
                departureMapper.departureToDepartureResponseDto(departure)
        );
    }

    @Override
    public BaseResponse delete(Integer id) {
        Departure departure = departureRepository.findById(id).orElseThrow(
                () -> new DepartureNotFoundException(id, Departure.class.getSimpleName())
        );
        departureRepository.delete(departure);
        return BaseResponse.ok("Salida eliminada.");

    }


}
