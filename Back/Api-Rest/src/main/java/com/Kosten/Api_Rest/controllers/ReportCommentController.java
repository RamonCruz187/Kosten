package com.Kosten.Api_Rest.controllers;

import com.Kosten.Api_Rest.dto.BaseResponse;
import com.Kosten.Api_Rest.dto.ExtendedBaseResponse;
import com.Kosten.Api_Rest.dto.ReportComment.ReportCommentDto;
import com.Kosten.Api_Rest.dto.ReportComment.ReportCommentRequestDto;
import com.Kosten.Api_Rest.dto.ReportComment.UpdateReportCommentDto;
import com.Kosten.Api_Rest.service.ReportCommentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;

@Tag(name = "Reportar Comentarios", description = "Gestionar los reportes de comentarios.")
@RestController
@RequestMapping("/report-comment")
@RequiredArgsConstructor
public class ReportCommentController {

    private final ReportCommentService reportCommentService;

    @Operation(summary = "Agregar un nuevo reporte a un comentario",
            description = "Permite reportar un comentario específico.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201",
                    description = "Reporte agregado correctamente.",
                    content = {
                            @Content(mediaType = "application/json",
                                    schema = @Schema(implementation = ExtendedBaseResponse.class))
                    }),
            @ApiResponse(responseCode = "404", description = "Comentario no encontrado.", content = {@Content}),
            @ApiResponse(responseCode = "500", description = "Error del servidor.", content = {@Content})
    })
    @PostMapping("/add")
    public ResponseEntity<ExtendedBaseResponse<ReportCommentDto>> addReportComment(
            @Valid @RequestBody ReportCommentRequestDto reportCommentRequestDto) {
        ReportCommentDto savedReportComment = reportCommentService.addReportComment(reportCommentRequestDto);
        BaseResponse response = BaseResponse.created("Reporte agregado correctamente.");
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ExtendedBaseResponse.of(response, savedReportComment));
    }

    @Operation(summary = "Obtener reporte por ID",
            description = "Permite obtener un reporte específico usando su ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Reporte encontrado exitosamente.",
                    content = {
                            @Content(mediaType = "application/json",
                                    schema = @Schema(implementation = ExtendedBaseResponse.class))
                    }),
            @ApiResponse(responseCode = "404", description = "Reporte no encontrado.", content = {@Content})
    })
    @GetMapping("/search/{id}")
    public ResponseEntity<ExtendedBaseResponse<ReportCommentDto>> getReportCommentById(@PathVariable Long id) {
        ReportCommentDto reportCommentDto = reportCommentService.findReportCommentById(id);
        BaseResponse response = BaseResponse.ok("Reporte encontrado exitosamente.");
        return ResponseEntity.ok(ExtendedBaseResponse.of(response, reportCommentDto));
    }

    @Operation(summary = "Obtener todos los reportes",
            description = "Permite obtener todos los reportes existentes.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Lista de reportes obtenida exitosamente.",
                    content = {
                            @Content(mediaType = "application/json",
                                    schema = @Schema(implementation = ExtendedBaseResponse.class))
                    })
    })
    @GetMapping("/list")
    public ResponseEntity<ExtendedBaseResponse<List<ReportCommentDto>>> getAllReportComments() {
        List<ReportCommentDto> reportCommentDtos = reportCommentService.reportCommentDtoList();
        BaseResponse response = BaseResponse.ok("Lista de reportes obtenida exitosamente.");
        return ResponseEntity.ok(ExtendedBaseResponse.of(response, reportCommentDtos));
    }

    @Operation(summary = "Actualizar un reporte",
            description = "Permite actualizar los detalles de un reporte usando su ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Reporte actualizado correctamente.",
                    content = {
                            @Content(mediaType = "application/json",
                                    schema = @Schema(implementation = ExtendedBaseResponse.class))
                    }),
            @ApiResponse(responseCode = "404", description = "Reporte no encontrado.", content = {@Content})
    })
    @PutMapping("/update/{id}")
    public ResponseEntity<ExtendedBaseResponse<ReportCommentDto>> updateReportComment(
            @PathVariable Long id, @Valid @RequestBody UpdateReportCommentDto updateReportCommentDto) {
        ReportCommentDto updatedReport = reportCommentService.updateReportComment(id, updateReportCommentDto);
        BaseResponse response = BaseResponse.ok("Reporte actualizado correctamente.");
        return ResponseEntity.ok(ExtendedBaseResponse.of(response, updatedReport));
    }

    @Operation(summary = "Eliminar un reporte por ID",
            description = "Permite eliminar un reporte específico usando su ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Reporte eliminado exitosamente.",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = BaseResponse.class))}),
            @ApiResponse(responseCode = "404", description = "Reporte no encontrado.", content = {@Content})
    })
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<BaseResponse> deleteReportCommentById(@PathVariable Long id) {
        reportCommentService.deleteByReportCommentId(id);
        BaseResponse response = BaseResponse.ok("Reporte eliminado exitosamente.");
        return ResponseEntity.ok(response);
    }


    @Operation(summary = "Obtener los reportes de un comentario específico",
            description = "Permite obtener todos los reportes asociados a un comentario.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Reportes del comentario obtenidos correctamente.",
                    content = {
                            @Content(mediaType = "application/json",
                                    schema = @Schema(implementation = ExtendedBaseResponse.class))
                    }),
            @ApiResponse(responseCode = "404", description = "Comentario no encontrado.", content = {@Content})
    })
    @GetMapping("/comment/{commentId}")
    public ResponseEntity<ExtendedBaseResponse<List<ReportCommentDto>>> getReportsByCommentId(@PathVariable Long commentId) {
        List<ReportCommentDto> reportComments = reportCommentService.getReportComments(commentId);
        BaseResponse response = BaseResponse.ok("Reportes del comentario obtenidos correctamente.");
        return ResponseEntity.ok(ExtendedBaseResponse.of(response, reportComments));
    }
}

