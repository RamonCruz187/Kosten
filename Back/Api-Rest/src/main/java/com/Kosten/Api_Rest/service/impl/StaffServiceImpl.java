package com.Kosten.Api_Rest.service.impl;

import com.Kosten.Api_Rest.dto.staff.StaffMapper;
import com.Kosten.Api_Rest.dto.staff.StaffRequestDto;
import com.Kosten.Api_Rest.model.Staff;
import com.Kosten.Api_Rest.repositoy.StaffRepository;
import com.Kosten.Api_Rest.service.StaffService;
import lombok.RequiredArgsConstructor;
import org.mapstruct.factory.Mappers;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StaffServiceImpl implements StaffService {

    private final StaffRepository staffRepository;

    @Override
    public Staff newStaff(StaffRequestDto staffRequestDto) {
        StaffMapper staffMapper = Mappers.getMapper(StaffMapper.class);
        Staff staff = staffMapper.toEntity(staffRequestDto);
        return staffRepository.save(staff);
    }

    @Override
    public Staff updateStaff(Long id, StaffRequestDto staffRequestDto) {
        Staff staff = staffRepository.findById(id).get();
        staff.setName(staffRequestDto.name());
        staff.setLastName(staffRequestDto.lastName());
        staff.setRol(staffRequestDto.rol());
        staff.setContact(staffRequestDto.contact());
        staff.setPhoto(staffRequestDto.photo());
        return staffRepository.save(staff);

    }

    @Override
    public Staff getStaff(Long id) {
        return staffRepository.findById(id).get();
    }

    @Override
    public boolean deleteStaff(Long id) {
        staffRepository.deleteById(id);
        return true;
    }
}
