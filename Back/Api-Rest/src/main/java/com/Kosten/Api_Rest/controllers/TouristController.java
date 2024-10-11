package com.Kosten.Api_Rest.controllers;

import com.Kosten.Api_Rest.dto.BaseResponse;
import com.Kosten.Api_Rest.dto.tourist.TouristRequestDto;
import com.Kosten.Api_Rest.dto.tourist.TouristResponseDto;
import com.Kosten.Api_Rest.service.TouristService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/tourist")
@RequiredArgsConstructor
public class TouristController {

    private final TouristService touristService;

    @PostMapping("/create")
    public ResponseEntity<BaseResponse> createTourist(@RequestBody TouristRequestDto newTourist){

        TouristResponseDto touristResponseDto = touristService.createTourist(newTourist);

        BaseResponse response = new BaseResponse(
                false,
                200,
                "Success",
                "Turista creado con exito");

        return new ResponseEntity<>(response, HttpStatus.OK);

    }
}
