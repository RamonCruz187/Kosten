package com.Kosten.Api_Rest.service.impl;

import com.Kosten.Api_Rest.dto.BaseResponse;
import com.Kosten.Api_Rest.dto.ExtendedBaseResponse;
import com.Kosten.Api_Rest.dto.staff.StaffResponseDto;
import com.Kosten.Api_Rest.dto.staff.StaffToUpdateDto;
import com.Kosten.Api_Rest.mapper.StaffMapper;
import com.Kosten.Api_Rest.dto.staff.StaffRequestDto;
import com.Kosten.Api_Rest.model.Image;
import com.Kosten.Api_Rest.model.Staff;
import com.Kosten.Api_Rest.repository.ImageRepository;
import com.Kosten.Api_Rest.repository.StaffRepository;
import com.Kosten.Api_Rest.service.ImageService;
import com.Kosten.Api_Rest.service.StaffService;
import lombok.RequiredArgsConstructor;
import org.mapstruct.factory.Mappers;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StaffServiceImpl implements StaffService {

    private final StaffRepository staffRepository;
    private final ImageService imageService;
    private final ImageRepository imageRepository;

    @Override
    public ExtendedBaseResponse<StaffResponseDto> newStaff(StaffRequestDto staffRequestDto, MultipartFile file) {
        StaffMapper staffMapper = Mappers.getMapper(StaffMapper.class);

        Image image = imageService.createNewImage(file);
        imageRepository.save(image);
        Staff staff = staffMapper.toEntity(staffRequestDto, image);
        staff.setPhoto(image);
        return ExtendedBaseResponse.of(
                BaseResponse.created("Staff creado exitosamente"), staffMapper.toDto(staffRepository.save(staff))
        );
    }

    @Override
    public ExtendedBaseResponse<StaffResponseDto> updateStaff(StaffToUpdateDto staffToUpdateDto) {
//        Staff staff = staffRepository.findById(staffToUpdateDto.id()).orElseThrow(() -> new IllegalArgumentException("Staff not found"));
//        StaffMapper staffMapper = Mappers.getMapper(StaffMapper.class);
//        staff.setName(staffToUpdateDto.name());
//        staff.setLastName(staffToUpdateDto.lastName());
//        staff.setRol(staffToUpdateDto.rol());
//        staff.setContact(staffToUpdateDto.contact());
//        //staff.setPhoto(staffToUpdateDto.photo());
//        return ExtendedBaseResponse.of(
//                BaseResponse.ok("Staff actualizado exitosamente"), staffMapper.toDto(staffRepository.save(staff))
//        );
        return null;
    }

    @Override
    public ExtendedBaseResponse<StaffResponseDto> getStaff(Long id) {
        Staff staff = staffRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Staff not found"));
        StaffMapper staffMapper = Mappers.getMapper(StaffMapper.class);
        StaffResponseDto staffResponseDto = staffMapper.toDto(staff);
        return ExtendedBaseResponse.of(
                BaseResponse.ok("Staff encontrado exitosamente"), staffResponseDto
        );
    }

    @Override
    public ExtendedBaseResponse<List<StaffResponseDto>> getAllStaff() {
        List<Staff> staff = staffRepository.findAll();
        StaffMapper staffMapper = Mappers.getMapper(StaffMapper.class);
        List<StaffResponseDto> staffResponseDto = staff.stream().map(staffMapper::toDto).toList();
        return ExtendedBaseResponse.of(
                BaseResponse.ok("Staff listado exitosamente"), staffResponseDto
        );
    }

    @Override
    public BaseResponse deleteStaff(Long id) {
        Staff staff = staffRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Staff not found"));
        staffRepository.delete(staff);
        return BaseResponse.ok("Staff eliminado exitosamente");
    }
}
