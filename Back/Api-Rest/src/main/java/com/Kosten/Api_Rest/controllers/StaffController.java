package com.Kosten.Api_Rest.controllers;

import com.Kosten.Api_Rest.dto.BaseResponse;
import com.Kosten.Api_Rest.dto.ExtendedBaseResponse;
import com.Kosten.Api_Rest.dto.staff.StaffRequestDto;
import com.Kosten.Api_Rest.dto.staff.StaffResponseDto;
import com.Kosten.Api_Rest.dto.staff.StaffToUpdateDto;
import com.Kosten.Api_Rest.model.Staff;
import com.Kosten.Api_Rest.service.StaffService;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/staff")
@RequiredArgsConstructor
public class StaffController {

    private final StaffService staffService;

    @PostMapping("/new")
    @Transactional
    public ResponseEntity<ExtendedBaseResponse<StaffResponseDto>> newStaff(@RequestBody @Valid StaffRequestDto staffRequestDto) {
        return ResponseEntity.status(201).body(staffService.newStaff(staffRequestDto));
    }


    @PutMapping("/update")
    @Transactional
    public ResponseEntity<ExtendedBaseResponse<StaffResponseDto>> updateStaff(@RequestBody @Valid StaffToUpdateDto staffToUpdateDto) {
        return ResponseEntity.status(200).body(staffService.updateStaff(staffToUpdateDto));
    }


    @GetMapping("/{id}")
    @Transactional
    public ResponseEntity<ExtendedBaseResponse<StaffResponseDto>> getStaff(@PathVariable Long id) {
        return ResponseEntity.status(200).body(staffService.getStaff(id));
    }


    @GetMapping("/all")
    @Transactional
    public ResponseEntity<ExtendedBaseResponse<List<StaffResponseDto>>> getAllStaff() {
        return ResponseEntity.status(200).body(staffService.getAllStaff());
    }


    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<BaseResponse> deleteStaff(@PathVariable Long id) {
        return ResponseEntity.status(200).body(staffService.deleteStaff(id));
    }

}
