package com.Kosten.Api_Rest.service;

import com.Kosten.Api_Rest.dto.staff.StaffRequestDto;
import com.Kosten.Api_Rest.model.Staff;

public interface StaffService {

    Staff newStaff(StaffRequestDto staffRequestDto);

    Staff updateStaff(Long id, StaffRequestDto staffRequestDto);

    Staff getStaff(Long id);

    boolean deleteStaff(Long id);
}
