package com.Kosten.Api_Rest.controllers;

import com.Kosten.Api_Rest.dto.BaseResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
public class TestController {

    @GetMapping
    public ResponseEntity<BaseResponse> test() {
        return ResponseEntity.ok(new BaseResponse(
                false,
                200,
                "OK",
                "Bienvenido a la API Rest de Turismo de Aventuras."
                )
        );
    }

}
