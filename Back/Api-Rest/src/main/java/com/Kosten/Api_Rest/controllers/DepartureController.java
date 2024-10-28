package com.Kosten.Api_Rest.controllers;

import com.Kosten.Api_Rest.dto.BaseResponse;
import com.Kosten.Api_Rest.dto.Departure.DepartureRequestDto;
import com.Kosten.Api_Rest.dto.Departure.DepartureResponseDto;
import com.Kosten.Api_Rest.dto.Departure.DepartureToBeListed;
import com.Kosten.Api_Rest.dto.Departure.DepartureToUpdateDto;
import com.Kosten.Api_Rest.dto.ExtendedBaseResponse;
import com.Kosten.Api_Rest.service.UserService;
import com.Kosten.Api_Rest.service.impl.DepartureServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/departures")
@Tag(name="departures", description="Administra las salidas ofrecidas por cada paquete.")
public class DepartureController {
    @Autowired
    DepartureServiceImpl departureService;
    @Autowired
    UserService userService;

    @Operation(
            summary = "Crea una nueva salida.",
            description = "Permite que un usuario de la empresa con sesión iniciada cree una Salida correspondiente a un Paquete."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "201", description = "Salida creada exitosamente.",
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
    public ResponseEntity<ExtendedBaseResponse<DepartureResponseDto>> createDeparture(
            @RequestBody @Valid DepartureRequestDto departureRequestDto,
            UriComponentsBuilder uriComponentsBuilder
            ){
        ExtendedBaseResponse<DepartureResponseDto> departureResponseDto = departureService.save(departureRequestDto);
        URI location = uriComponentsBuilder
                .path("/departures/{id}")
                .buildAndExpand(departureResponseDto.data().getId())
                .toUri();
        return ResponseEntity.created(location).body(departureResponseDto);
    }

    @Operation(
            summary = "Obtiene una Salida por su id.",
            description = "Permite a un usuario obtener una salida mediante su id."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200", description = "Salida obtenida exitosamente..",
                    content = {
                            @Content(mediaType = "application/json",
                                    schema = @Schema(implementation = ExtendedBaseResponse.class))
                    }),
            @ApiResponse(responseCode = "400", description = "Bad request.", content = {@Content}),
            @ApiResponse(responseCode = "401", description = "Unauthorized.", content = {@Content}),
            @ApiResponse(responseCode = "403", description = "Forbidden.", content = {@Content}),
            @ApiResponse(responseCode = "404", description = "Departure not found.", content = {@Content}),
            @ApiResponse(responseCode = "500", description = "Server error.", content = {@Content})
    })
    @GetMapping("/{id}")
    public ResponseEntity<ExtendedBaseResponse<DepartureResponseDto>> getDepartureById(@PathVariable Integer id) {
        return ResponseEntity
                .status(200)
                .body(departureService.findById(id));
    }

    @Operation(
            summary = "Obtiene todas las salidas.",
            description = "Permite obtener todas las Salidas existentes de todos los Paquetes."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "201", description = "Salidas obtenidas exitosamente.",
                    content = {
                            @Content(mediaType = "application/json",
                                    schema = @Schema(implementation = ExtendedBaseResponse.class))
                    }),
            @ApiResponse(responseCode = "403", description = "Forbidden access to this resource", content = {@Content}),
            @ApiResponse(responseCode = "404", description = "Departures not found", content = {@Content}),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = {@Content})
    })
    @GetMapping
    public ResponseEntity<ExtendedBaseResponse<List<DepartureToBeListed>>> getAllDepartures() {
        return ResponseEntity
                .status(200)
                .body(departureService.findAll());
    }

    @Operation(
            summary = "Actualizar Salida.",
            description = "Permite que un usuario de la empresa que haya iniciado sesión (admin) actualice una salida enviando los datos de la misma a través del cuerpo de la solicitud."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200", description = "Salida actualizada exitosamente.",
                    content = {
                            @Content(mediaType = "application/json",
                                    schema = @Schema(implementation = ExtendedBaseResponse.class))
                    }),
            @ApiResponse(responseCode = "400", description = "Bad request.", content = {@Content}),
            @ApiResponse(responseCode = "401", description = "Unauthorized.", content = {@Content}),
            @ApiResponse(responseCode = "403", description = "Forbidden.", content = {@Content}),
            @ApiResponse(responseCode = "404", description = "Departure not found.", content = {@Content}),
            @ApiResponse(responseCode = "500", description = "Server error.", content = {@Content})
    })
    @PutMapping
    @Transactional
    public ResponseEntity<ExtendedBaseResponse<DepartureResponseDto>> updateDeparture(
            @RequestBody @Valid DepartureToUpdateDto departureToUpdateDto
    ) {
        return ResponseEntity
                .status(200)
                .body(departureService.update(departureToUpdateDto));
    }

    @Operation(
            summary = "Elimina una Salida.",
            description = "Permite que un usuario de la empresa que haya iniciado sesión (admin) elimine una salida."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200", description = "Salida eliminada correctamente.",
                    content = {
                            @Content(mediaType = "application/json",
                                    schema = @Schema(implementation = BaseResponse.class))
                    }),
            @ApiResponse(responseCode = "400", description = "Bad request.", content = {@Content}),
            @ApiResponse(responseCode = "401", description = "Unauthorized.", content = {@Content}),
            @ApiResponse(responseCode = "403", description = "Forbidden.", content = {@Content}),
            @ApiResponse(responseCode = "404", description = "Departure not found.", content = {@Content}),
            @ApiResponse(responseCode = "500", description = "Server error.", content = {@Content})
    })
    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<BaseResponse> deleteDeparture( @PathVariable Integer id ) {
        return ResponseEntity
                .status(200)
                .body(departureService.delete(id));
    }





}
