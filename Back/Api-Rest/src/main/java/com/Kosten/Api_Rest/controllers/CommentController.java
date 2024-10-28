package com.Kosten.Api_Rest.controllers;

import com.Kosten.Api_Rest.dto.comment.*;
import com.Kosten.Api_Rest.dto.BaseResponse;
import com.Kosten.Api_Rest.dto.ExtendedBaseResponse;
import com.Kosten.Api_Rest.Exception.commentExc.CommentNotFoundException;
import com.Kosten.Api_Rest.service.CommentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Comentarios", description = "Gestionar los comentarios.")
@RestController
@RequestMapping("/comment")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @Operation(summary = "Crear un comentario",
            description = "Permite a un usuario crear un nuevo comentario.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201",
                    description = "Comentario creado exitosamente.",
                    content = {
                            @Content(mediaType = "application/json",
                                    schema = @Schema(implementation = ExtendedBaseResponse.class))
                    }),
            @ApiResponse(responseCode = "400", description = "Solicitud no válida.", content = {@Content}),
            @ApiResponse(responseCode = "500", description = "Error del servidor.", content = {@Content})
    })
    @PostMapping("/save")
    public ResponseEntity<ExtendedBaseResponse<CommentDto>> createComment(@Valid @RequestBody CommentRequestDto commentRequestDto) {
        CommentDto savedComment = commentService.createComment(commentRequestDto);
        BaseResponse response = BaseResponse.created("Comentario creado exitosamente.");
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ExtendedBaseResponse.of(response, savedComment));
    }

    @Operation(summary = "Buscar un comentario por ID",
            description = "Permite recuperar un comentario específico mediante su ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",
                    description = "Comentario recuperado exitosamente.",
                    content = {
                            @Content(mediaType = "application/json",
                                    schema = @Schema(implementation = ExtendedBaseResponse.class))
                    }),
            @ApiResponse(responseCode = "404", description = "Comentario no encontrado.", content = {@Content}),
            @ApiResponse(responseCode = "500", description = "Error del servidor.", content = {@Content})
    })
    @GetMapping("/search/{id}")
    public ResponseEntity<ExtendedBaseResponse<CommentDto>> findCommentById(@PathVariable("id") Long id) {
        try {
            CommentDto commentDto = commentService.findCommentById(id);
            BaseResponse response = BaseResponse.ok("Comentario recuperado exitosamente.");
            return ResponseEntity.ok(ExtendedBaseResponse.of(response, commentDto));
        } catch (CommentNotFoundException ex) {
            BaseResponse response = new BaseResponse(true, HttpStatus.NOT_FOUND, ex.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ExtendedBaseResponse.of(response, null));
        }
    }

    @Operation(summary = "Listar todos los comentarios",
            description = "Permite recuperar una lista de todos los comentarios.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",
                    description = "Comentarios recuperados exitosamente.",
                    content = {
                            @Content(mediaType = "application/json",
                                    schema = @Schema(implementation = ExtendedBaseResponse.class))
                    }),
            @ApiResponse(responseCode = "500", description = "Error del servidor.", content = {@Content})
    })
    @GetMapping("/list")
    public ResponseEntity<ExtendedBaseResponse<List<CommentDto>>> listComment() {
        List<CommentDto> commentDtoList = commentService.commentlist();
        BaseResponse response = BaseResponse.ok("Comentarios recuperados exitosamente.");
        return ResponseEntity.ok(ExtendedBaseResponse.of(response, commentDtoList));
    }

    @Operation(summary = "Actualizar un comentario",
            description = "Permite a un usuario actualizar un comentario existente.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",
                    description = "Comentario actualizado exitosamente.",
                    content = {
                            @Content(mediaType = "application/json",
                                    schema = @Schema(implementation = ExtendedBaseResponse.class))
                    }),
            @ApiResponse(responseCode = "404", description = "Comentario no encontrado.", content = {@Content}),
            @ApiResponse(responseCode = "400", description = "Solicitud no válida.", content = {@Content}),
            @ApiResponse(responseCode = "500", description = "Error del servidor.", content = {@Content})
    })
    @PutMapping("/update/{id}")
    public ResponseEntity<ExtendedBaseResponse<CommentDto>> updateComment(@Valid @PathVariable("id") Long id, @RequestBody UpdateCommentDto updateComment) {
        CommentDto updatedComment = commentService.updateComment(id, updateComment);
        BaseResponse response = BaseResponse.ok("Comentario actualizado exitosamente.");
        return ResponseEntity.ok(ExtendedBaseResponse.of(response, updatedComment));
    }

    @Operation(summary = "Eliminar un comentario",
            description = "Permite a un usuario eliminar un comentario existente.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",
                    description = "Comentario eliminado exitosamente.",
                    content = {
                            @Content(mediaType = "application/json",
                                    schema = @Schema(implementation = ExtendedBaseResponse.class))
                    }),
            @ApiResponse(responseCode = "404", description = "Comentario no encontrado.", content = {@Content}),
            @ApiResponse(responseCode = "500", description = "Error del servidor.", content = {@Content})
    })
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ExtendedBaseResponse<String>> deleteComment(@PathVariable("id") Long id) {
        commentService.deleteComment(id);
        BaseResponse response = BaseResponse.ok("Comentario eliminado exitosamente.");
        return ResponseEntity.ok(ExtendedBaseResponse.of(response, "El comentario fue eliminado."));
    }

    @Operation(summary = "Actualizar la visibilidad de un comentario",
            description = "Permite a un usuario actualizar la visibilidad de un comentario.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",
                    description = "Visibilidad del comentario actualizada exitosamente.",
                    content = {
                            @Content(mediaType = "application/json",
                                    schema = @Schema(implementation = ExtendedBaseResponse.class))
                    }),
            @ApiResponse(responseCode = "404", description = "Comentario no encontrado.", content = {@Content}),
            @ApiResponse(responseCode = "400", description = "Solicitud no válida.", content = {@Content}),
            @ApiResponse(responseCode = "500", description = "Error del servidor.", content = {@Content})
    })
    @PutMapping("/update-visibility")
    public ResponseEntity<ExtendedBaseResponse<CommentDto>> updateCommentVisibility(@Valid @RequestBody UpdateVisibilityCommentDto updateVisibilityCommentDto) {
        CommentDto updatedComment = commentService.updateCommentVisibility(updateVisibilityCommentDto);
        BaseResponse response = BaseResponse.ok("La visibilidad de los comentarios se actualizó correctamente.");
        return ResponseEntity.ok(ExtendedBaseResponse.of(response, updatedComment));
    }


    @Operation(summary = "Obtener el número de reportes de un comentario",
            description = "Devuelve la cantidad de reportes asociados a un comentario específico.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",
                    description = "Cantidad de reportes obtenida exitosamente.",
                    content = {
                            @Content(mediaType = "application/json",
                                    schema = @Schema(implementation = ExtendedBaseResponse.class))
                    }),
            @ApiResponse(responseCode = "404", description = "Comentario no encontrado.", content = {@Content}),
            @ApiResponse(responseCode = "500", description = "Error del servidor.", content = {@Content})
    })
    @GetMapping("/reports/count/{commentId}")
    public ResponseEntity<ExtendedBaseResponse<Integer>> getReportCommentCount(@PathVariable("commentId") Long commentId) {
        int reportCount = commentService.getReportCommentCount(commentId);
        String message = "Cantidad de reportes: " + reportCount;
        BaseResponse response = BaseResponse.ok(message);
        return ResponseEntity.ok(ExtendedBaseResponse.of(response, reportCount));
    }

    @Operation(summary = "Actualizar el estado de favorito de un comentario",
            description = "Permite a un usuario marcar o desmarcar un comentario como favorito.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",
                    description = "Estado de favorito actualizado exitosamente.",
                    content = {
                            @Content(mediaType = "application/json",
                                    schema = @Schema(implementation = ExtendedBaseResponse.class))
                    }),
            @ApiResponse(responseCode = "404", description = "Comentario no encontrado.", content = {@Content}),
            @ApiResponse(responseCode = "400", description = "Solicitud no válida.", content = {@Content}),
            @ApiResponse(responseCode = "500", description = "Error del servidor.", content = {@Content})
    })
    @PutMapping("/update-favorite")
    public ResponseEntity<ExtendedBaseResponse<CommentDto>> updateCommentFavorite(@Valid @RequestBody UpdateFavoriteCommentDto updateFavoriteCommentDto) {
        CommentDto updatedComment = commentService.updateCommentFavorite(updateFavoriteCommentDto);
        BaseResponse response = BaseResponse.ok("El estado de favorito del comentario se actualizó correctamente.");
        return ResponseEntity.ok(ExtendedBaseResponse.of(response, updatedComment));
    }

    @Operation(summary = "Obtener comentarios visibles y favoritos",
            description = "Devuelve todos los comentarios que están marcados como visibles y favoritos.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Comentarios obtenidos exitosamente.",
                    content = {
                            @Content(mediaType = "application/json",
                                    schema = @Schema(implementation = CommentDto.class))
                    }),
            @ApiResponse(responseCode = "500", description = "Error del servidor.", content = {@Content})
    })
    @GetMapping("/comments/visible-favorite")
    public ResponseEntity<ExtendedBaseResponse<List<CommentDto>>> getVisibleAndFavoriteComments() {
        List<CommentDto> comments = commentService.findVisibleAndFavoriteComments();
        BaseResponse response = BaseResponse.ok("Comentarios visibles y favoritos obtenidos exitosamente.");
        return ResponseEntity.ok(ExtendedBaseResponse.of(response, comments));
    }

    @Operation(summary = "Buscar un comentario con nombre del paquete por ID",
            description = "Permite recuperar un comentario específico junto con el nombre del paquete mediante su ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",
                    description = "Comentario y nombre del paquete recuperados exitosamente.",
                    content = {
                            @Content(mediaType = "application/json",
                                    schema = @Schema(implementation = ExtendedBaseResponse.class))
                    }),
            @ApiResponse(responseCode = "404", description = "Comentario no encontrado.", content = {@Content}),
            @ApiResponse(responseCode = "500", description = "Error del servidor.", content = {@Content})
    })
    @GetMapping("/package/{commentId}")
    public ResponseEntity<ExtendedBaseResponse<CPackageResponse>> findCommentWithPackageById(@PathVariable("commentId") Long commentId) {
            CPackageResponse cPackageResponse = commentService.findCommentWithPackageById(commentId);
            BaseResponse response = BaseResponse.ok("Comentario y nombre del paquete recuperados exitosamente.");
            return ResponseEntity.ok(ExtendedBaseResponse.of(response, cPackageResponse));
    }

}