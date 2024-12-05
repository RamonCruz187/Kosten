package com.Kosten.Api_Rest.controllers;

import com.Kosten.Api_Rest.dto.BaseResponse;
import com.Kosten.Api_Rest.dto.ExtendedBaseResponse;
import com.Kosten.Api_Rest.dto.staff.StaffRequestDto;
import com.Kosten.Api_Rest.dto.staff.StaffResponseDto;
import com.Kosten.Api_Rest.dto.staff.StaffToUpdateDto;
import com.Kosten.Api_Rest.service.StaffService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Tag(name = "Staff", description = "Maneja todos los endpoints del Staff.")
@RestController
@RequestMapping("/staff")
@RequiredArgsConstructor
public class StaffController {

    private final StaffService staffService;

    @Operation(
            summary = "Crear un nuevo miembro del staff.",
            description = "Permite a un administrador crear un nuevo miembro del staff."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "201", description = "Staff creado exitosamente.",
                    content = {
                            @Content(mediaType = "application/json",
                                    schema = @Schema(implementation = ExtendedBaseResponse.class))
                    }),
            @ApiResponse(responseCode = "400", description = "Bad request.", content = {@Content}),
            @ApiResponse(responseCode = "401", description = "Unauthorized.", content = {@Content}),
            @ApiResponse(responseCode = "403", description = "Forbidden access to this resource", content = {@Content}),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = {@Content})
    })
    @PostMapping(value = "/new", consumes = {"multipart/form-data"})
    @Transactional
    public ResponseEntity<ExtendedBaseResponse<StaffResponseDto>> newStaff(
            @RequestPart("staffData") @Valid StaffRequestDto staff,
            @RequestPart(value ="fileImage", required = false) @Valid MultipartFile file) {

        try {
            return ResponseEntity.status(201).body(staffService.newStaff(staff, file));
        } catch (Exception e) {
            throw new RuntimeException("No se ha podido crear el Staff");
        }
    }



    @Operation(
            summary = "Actualizar un miembro del staff.",
            description = "Permite a un admin de la empresa actualizar un miembro del staff enviando sus datos, imagen y ID."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200", description = "staff actualizado exitosamente.",
                    content = {
                            @Content(mediaType = "application/json",
                                    schema = @Schema(implementation = ExtendedBaseResponse.class))
                    }),
            @ApiResponse(responseCode = "400", description = "Bad request.", content = {@Content}),
            @ApiResponse(responseCode = "401", description = "Unauthorized.", content = {@Content}),
            @ApiResponse(responseCode = "403", description = "Forbidden.", content = {@Content}),
            @ApiResponse(responseCode = "404", description = "Staff no encontrado.", content = {@Content}),
            @ApiResponse(responseCode = "500", description = "Server error.", content = {@Content})
    })
    @PutMapping(value = "/update", consumes = {"multipart/form-data"})
    @Transactional
    public ResponseEntity<ExtendedBaseResponse<StaffResponseDto>> updateStaff(
            @RequestPart("staffData") @Valid StaffToUpdateDto staff,
            @RequestPart(value = "fileImage", required = false) @Valid MultipartFile file) {
        try {
            return ResponseEntity.status(201).body(staffService.updateStaff(staff, file));
        } catch (Exception e) {
            throw new RuntimeException("No se ha podido actualizar el Staff");
        }
    }

    @Operation(
            summary = "Obtiene un miembro del staff por su ID.",
            description = "Permite a un admin de la empresa obtener un miembro del staff por su ID."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200", description = "Staff obtenido exitosamente.",
                    content = {
                            @Content(mediaType = "application/json",
                                    schema = @Schema(implementation = ExtendedBaseResponse.class))
                    }),
            @ApiResponse(responseCode = "400", description = "Bad request.", content = {@Content}),
            @ApiResponse(responseCode = "401", description = "Unauthorized.", content = {@Content}),
            @ApiResponse(responseCode = "403", description = "Forbidden.", content = {@Content}),
            @ApiResponse(responseCode = "404", description = "Staff no encontrado.", content = {@Content}),
            @ApiResponse(responseCode = "500", description = "Server error.", content = {@Content})
    })
    @GetMapping("/{id}")
    @Transactional
    public ResponseEntity<ExtendedBaseResponse<StaffResponseDto>> getStaff(@PathVariable Long id) {
        return ResponseEntity.status(200).body(staffService.getStaff(id));
    }

    @Operation(
            summary = "Obtiene todos los miembros del staff.",
            description = "Permite a un admin de la empresa obtener todos los miembros del staff."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200", description = "Staff obtenido exitosamente.",
                    content = {
                            @Content(mediaType = "application/json",
                                    schema = @Schema(implementation = ExtendedBaseResponse.class))
                    }),
            @ApiResponse(responseCode = "400", description = "Bad request.", content = {@Content}),
            @ApiResponse(responseCode = "401", description = "Unauthorized.", content = {@Content}),
            @ApiResponse(responseCode = "403", description = "Forbidden.", content = {@Content}),
            @ApiResponse(responseCode = "404", description = "Staff no encontrado.", content = {@Content}),
            @ApiResponse(responseCode = "500", description = "Server error.", content = {@Content})
    })
    @GetMapping("/all")
    @Transactional
    public ResponseEntity<ExtendedBaseResponse<List<StaffResponseDto>>> getAllStaff() {

        return ResponseEntity.status(200).body(staffService.getAllStaff());
    }

    @Operation(
            summary = "Eliminar un miembro del staff.",
            description = "Permite a un admin de la empresa eliminar un miembro del staff."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200", description = "Staff eliminado exitosamente.",
                    content = {
                            @Content(mediaType = "application/json",
                                    schema = @Schema(implementation = BaseResponse.class))
                    }),
            @ApiResponse(responseCode = "400", description = "Bad request.", content = {@Content}),
            @ApiResponse(responseCode = "401", description = "Unauthorized.", content = {@Content}),
            @ApiResponse(responseCode = "403", description = "Forbidden.", content = {@Content}),
            @ApiResponse(responseCode = "404", description = "Staff no encontrado.", content = {@Content}),
            @ApiResponse(responseCode = "500", description = "Server error.", content = {@Content})
    })
    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<BaseResponse> deleteStaff(@PathVariable Long id) {
        return ResponseEntity.status(200).body(staffService.deleteStaff(id));
    }

}
