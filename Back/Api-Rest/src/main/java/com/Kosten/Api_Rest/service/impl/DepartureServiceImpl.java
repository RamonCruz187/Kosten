package com.Kosten.Api_Rest.service.impl;

import com.Kosten.Api_Rest.Exception.packagesExc.PackageNotFoundException;
import com.Kosten.Api_Rest.Exception.userExc.UserNotFoundException;
import com.Kosten.Api_Rest.dto.BaseResponse;
import com.Kosten.Api_Rest.dto.Departure.DepartureRequestDto;
import com.Kosten.Api_Rest.dto.Departure.DepartureResponseDto;
import com.Kosten.Api_Rest.dto.Departure.DepartureToBeListed;
import com.Kosten.Api_Rest.dto.Departure.DepartureToUpdateDto;
import com.Kosten.Api_Rest.dto.ExtendedBaseResponse;
import com.Kosten.Api_Rest.Exception.DepartureNotFoundException;
import com.Kosten.Api_Rest.dto.user.UserResponseDto;
import com.Kosten.Api_Rest.dto.user.UserToBeListed;
import com.Kosten.Api_Rest.mapper.DepartureMapper;
import com.Kosten.Api_Rest.mapper.UserMapper;
import com.Kosten.Api_Rest.model.Departure;
import com.Kosten.Api_Rest.model.Package;
import com.Kosten.Api_Rest.model.User;
import com.Kosten.Api_Rest.repository.PackageRepository;
import com.Kosten.Api_Rest.repository.IDepartureRepository;
import com.Kosten.Api_Rest.repository.UserRepository;
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
    private UserMapper userMapper;
    @Autowired
    private PackageRepository packageRepository;
    @Autowired
    private UserRepository userRepository;

    @Override
    @Transactional(readOnly = true)
    public ExtendedBaseResponse<List<DepartureToBeListed>> findAll() {
        List<Departure> departuresList = departureRepository.findAll();
        List<DepartureToBeListed> departureToBeListedList = departuresList.stream()
                .map(departureMapper::departureToDepartureToBeListed)
                .collect(Collectors.toList());
        return ExtendedBaseResponse.of(
                BaseResponse.ok("Lista de salidas obtenida."),
                departureToBeListedList
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


    public void addUserToDeparture(Long userId, Integer departureId) {
        Departure departure = departureRepository.findById(departureId)
                .orElseThrow(() -> new DepartureNotFoundException(departureId, Departure.class.getSimpleName()));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        departure.getUsersList().add(user);
        user.getDepartures().add(departure);
        departureRepository.save(departure);
        return;
    }

    public void removeUserFromDeparture(Integer departureId, Long userId) {
        Departure departure = departureRepository.findById(departureId)
                .orElseThrow(() -> new DepartureNotFoundException(departureId, Departure.class.getSimpleName()));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        departure.getUsersList().remove(user);
        user.getDepartures().remove(departure);

        departureRepository.save(departure);
    }

    public List<UserToBeListed> getUsersByDepartureId(Integer departureId) {
        Departure departure = departureRepository.findById(departureId)
                .orElseThrow(() -> new DepartureNotFoundException(departureId, Departure.class.getSimpleName()));
        return
                departure.getUsersList().stream()
                .map(userMapper::userToUserToBeListed)
                .collect(Collectors.toList());
    }


    public List<DepartureResponseDto> getAllDeparturesWithUsers() {
        List<Departure> departuresList = departureRepository.findAllWithUsers();
        List<DepartureResponseDto> departureResponseDtoList = departuresList.stream()
                .map(departure -> {
                    DepartureResponseDto departureResponseDto = departureMapper.departureToDepartureResponseDto(departure);
                    departureResponseDto.setUsersList(departure.getUsersList().stream()
                            .map(userMapper::userToUserToBeListed)
                            .collect(Collectors.toList()));
                    return departureResponseDto;
                })
                .collect(Collectors.toList());
        return departureResponseDtoList;
    }
}
