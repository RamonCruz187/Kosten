package com.Kosten.Api_Rest.controllers;

import com.Kosten.Api_Rest.dto.packageDTO.PackageRequestDTO;
import com.Kosten.Api_Rest.dto.packageDTO.PackageResponseDTO;
import com.Kosten.Api_Rest.service.PackageService;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/packages")
@RequiredArgsConstructor
public class PackageController {

    private final PackageService packageService;

    @PostMapping
    @Transactional
    public ResponseEntity<PackageResponseDTO> createPackage(
            @RequestBody @Valid PackageRequestDTO packageRequestDTO,
            UriComponentsBuilder uriComponentsBuilder
    ) {

        PackageResponseDTO packageResponseDTO = packageService.createPackage(packageRequestDTO);

        URI location = uriComponentsBuilder
                .path("/packages/{id}")
                .buildAndExpand(packageResponseDTO.id())
                .toUri();

        return ResponseEntity
                .created(location)
                .body(packageResponseDTO);
    }
}
