package com.Kosten.Api_Rest.controllers;

import com.Kosten.Api_Rest.dto.ExtendedBaseResponse;
import com.Kosten.Api_Rest.dto.packageDTO.PackageRequestDTO;
import com.Kosten.Api_Rest.dto.packageDTO.PackageResponseDTO;
import com.Kosten.Api_Rest.service.PackageService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirements;
import io.swagger.v3.oas.annotations.tags.Tag;
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

@Tag(name = "Paquetes", description = "Maneja todos los endpoints de los Paquetes que se ofrecen.")
@RestController
@RequestMapping("/packages")
@RequiredArgsConstructor
public class PackageController {

    private final PackageService packageService;

    @Operation(
            summary = "Crear un nuevo Paquete.",
            description = "Permite a un usuario de la empresa crear un Paquete."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "201", description = "Paquete creado exitosamente.",
                    content = {
                            @Content(mediaType = "application/json",
                                    schema = @Schema(implementation = ExtendedBaseResponse.class))
                    }),
            @ApiResponse(responseCode = "400", description = "Bad request.", content = {@Content}),
            @ApiResponse(responseCode = "401", description = "Unauthorized.", content = {@Content}),
            @ApiResponse(responseCode = "403", description = "Forbidden access to this resource", content = {@Content}),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = {@Content})
    })
    @SecurityRequirements()
    @PostMapping
    @Transactional
    public ResponseEntity<ExtendedBaseResponse<PackageResponseDTO>> createPackage(
            @RequestBody @Valid PackageRequestDTO packageRequestDTO,
            UriComponentsBuilder uriComponentsBuilder
    ) {

        ExtendedBaseResponse<PackageResponseDTO> packageResponseDTO = packageService.createPackage(packageRequestDTO);

        URI location = uriComponentsBuilder
                .path("/packages/{id}")
                .buildAndExpand(packageResponseDTO.data().id())
                .toUri();

        return ResponseEntity
                .created(location)
                .body(packageResponseDTO);
    }
}
