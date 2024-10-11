package com.Kosten.Api_Rest.controllers;

import com.Kosten.Api_Rest.dto.BaseResponse;
import com.Kosten.Api_Rest.dto.ExtendedBaseResponse;
import com.Kosten.Api_Rest.dto.packageDTO.PackageRequestDTO;
import com.Kosten.Api_Rest.dto.packageDTO.PackageResponseDTO;
import com.Kosten.Api_Rest.dto.packageDTO.PackageToUpdateDTO;
import com.Kosten.Api_Rest.service.PackageService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirements;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
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
            description = "Permite a un usuario logueado de la empresa crear un Paquete."
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

    @Operation(
            summary = "Obtiene un Paquete por su ID.",
            description = "Permite a un usuario logueado de la empresa obtener un paquete por su ID."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200", description = "Paquete obtenido exitosamente.",
                    content = {
                            @Content(mediaType = "application/json",
                                    schema = @Schema(implementation = ExtendedBaseResponse.class))
                    }),
            @ApiResponse(responseCode = "400", description = "Bad request.", content = {@Content}),
            @ApiResponse(responseCode = "401", description = "Unauthorized.", content = {@Content}),
            @ApiResponse(responseCode = "403", description = "Forbidden.", content = {@Content}),
            @ApiResponse(responseCode = "404", description = "Paquete no encontrado.", content = {@Content}),
            @ApiResponse(responseCode = "500", description = "Server error.", content = {@Content})
    })
    @GetMapping("/{id}")
    public ResponseEntity<ExtendedBaseResponse<PackageResponseDTO>> getPackageById(@PathVariable Long id) {
        return ResponseEntity
                .status(200)
                .body(packageService.getPackageById(id));
    }

    @Operation(
            summary = "Obtener todos los Paquetes en una lista paginada y/o ordenada.",
            description = "Permite a un usuario logueado de la empresa obtener todos los paquetes, en una lista paginada."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "201", description = "Lista de Paquetes obtenidos exitosamente.",
                    content = {
                            @Content(mediaType = "application/json",
                                    schema = @Schema(implementation = ExtendedBaseResponse.class))
                    }),
            @ApiResponse(responseCode = "403", description = "Forbidden access to this resource", content = {@Content}),
            @ApiResponse(responseCode = "404", description = "Paquetes no encontrados", content = {@Content}),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = {@Content})
    })
    @Parameters({
            @Parameter(name = "page", description = "Page number", required = false, example = "0"),
            @Parameter(name = "size", description = "Size of the page", required = false, example = "10"),
            @Parameter(name = "sort", description = "Sort the page", required = false, example = "id,desc")
    })
    @GetMapping
    public ResponseEntity<ExtendedBaseResponse<Page<PackageResponseDTO>>> getAllPackages(Pageable pageable) {
        return ResponseEntity
                .status(200)
                .body(packageService.getAllPackages(pageable));
    }

    @Operation(
            summary = "Actualizar un Paquete.",
            description = "Permite a un usuario logueado de la empresa actualizar un paquete enviando sus datos y ID por el Body."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200", description = "Paquete actualizado exitosamente.",
                    content = {
                            @Content(mediaType = "application/json",
                                    schema = @Schema(implementation = ExtendedBaseResponse.class))
                    }),
            @ApiResponse(responseCode = "400", description = "Bad request.", content = {@Content}),
            @ApiResponse(responseCode = "401", description = "Unauthorized.", content = {@Content}),
            @ApiResponse(responseCode = "403", description = "Forbidden.", content = {@Content}),
            @ApiResponse(responseCode = "404", description = "Paquete no encontrado.", content = {@Content}),
            @ApiResponse(responseCode = "500", description = "Server error.", content = {@Content})
    })
    @PutMapping
    @Transactional
    public ResponseEntity<ExtendedBaseResponse<PackageResponseDTO>> updateNote(
            @RequestBody @Valid PackageToUpdateDTO packageToUpdateDTO
    ) {
        return ResponseEntity
                .status(200)
                .body(packageService.update( packageToUpdateDTO ));
    }

    @Operation(
            summary = "Eliminar un paquete.",
            description = "Permite a un usuario logueado de la empresa eliminar un paquete."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200", description = "Paquete eliminado exitosamente.",
                    content = {
                            @Content(mediaType = "application/json",
                                    schema = @Schema(implementation = BaseResponse.class))
                    }),
            @ApiResponse(responseCode = "400", description = "Bad request.", content = {@Content}),
            @ApiResponse(responseCode = "401", description = "Unauthorized.", content = {@Content}),
            @ApiResponse(responseCode = "403", description = "Forbidden.", content = {@Content}),
            @ApiResponse(responseCode = "404", description = "Paquete no encontrado.", content = {@Content}),
            @ApiResponse(responseCode = "500", description = "Server error.", content = {@Content})
    })
    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<BaseResponse> deleteNote( @PathVariable Long id ) {
        return ResponseEntity
                .status(200)
                .body(packageService.delete( id ));
    }
}
