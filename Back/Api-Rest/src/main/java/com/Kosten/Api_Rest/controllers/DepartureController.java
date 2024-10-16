package com.Kosten.Api_Rest.controllers;

import com.Kosten.Api_Rest.dto.BaseResponse;
import com.Kosten.Api_Rest.dto.Departure.DepartureRequestDto;
import com.Kosten.Api_Rest.dto.Departure.DepartureResponseDto;
import com.Kosten.Api_Rest.dto.Departure.DepartureToUpdateDto;
import com.Kosten.Api_Rest.dto.ExtendedBaseResponse;
import com.Kosten.Api_Rest.service.DepartureServiceImpl;
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
@Tag(name="departures", description="manages the departures offered for each package.")
public class DepartureController {
    @Autowired
    DepartureServiceImpl departureService;

    @Operation(
            summary = "Creates a new Departure",
            description = "Allows a logged in company user to create an Departure corresponding to a package."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "201", description = "Departure created successfully",
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
            summary = "Get a Departure by its ID.",
            description = "Allows a user to get a Departure by its ID."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200", description = "Departure obtained successfully.",
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
            summary = "Obtains all Departures.",
            description = "Allows to obtain all Departures from all Packages."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "201", description = "Departures obtained successfully.",
                    content = {
                            @Content(mediaType = "application/json",
                                    schema = @Schema(implementation = ExtendedBaseResponse.class))
                    }),
            @ApiResponse(responseCode = "403", description = "Forbidden access to this resource", content = {@Content}),
            @ApiResponse(responseCode = "404", description = "Departures not found", content = {@Content}),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = {@Content})
    })
    @GetMapping
    public ResponseEntity<ExtendedBaseResponse<List<DepartureResponseDto>>> getAllDepartures() {
        return ResponseEntity
                .status(200)
                .body(departureService.findAll());
    }

    @Operation(
            summary = "Update a Departure",
            description = "Allows a logged in company user to update an output by sending the Departure data through the Body."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200", description = "Departure updated successfully",
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
            summary = "Delete a Departure",
            description = "Allows a logged in company user to delete a Departure."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200", description = "Departure deleted successfully.",
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
