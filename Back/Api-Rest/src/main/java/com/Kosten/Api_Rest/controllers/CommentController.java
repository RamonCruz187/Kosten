package com.Kosten.Api_Rest.controllers;

import com.Kosten.Api_Rest.dto.CommentDto;
import com.Kosten.Api_Rest.dto.BaseResponse;
import com.Kosten.Api_Rest.dto.ExtendedBaseResponse;
import com.Kosten.Api_Rest.Exception.CommentNotFoundException;
import com.Kosten.Api_Rest.service.CommentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
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
    public ResponseEntity<ExtendedBaseResponse<CommentDto>> createComment(@RequestBody CommentDto commentDto) {
        CommentDto savedComment = commentService.createComment(commentDto);
        BaseResponse response = BaseResponse.created("Comment created successfully.");
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
            BaseResponse response = BaseResponse.ok("Comment retrieved successfully.");
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
        BaseResponse response = BaseResponse.ok("Comments retrieved successfully.");
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
    public ResponseEntity<ExtendedBaseResponse<CommentDto>> updateComment(@PathVariable("id") Long id, @RequestBody CommentDto updateComment) {
        CommentDto updatedComment = commentService.updateComment(id, updateComment);
        BaseResponse response = BaseResponse.ok("Comment updated successfully.");
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
        BaseResponse response = BaseResponse.ok("Comment deleted successfully.");
        return ResponseEntity.ok(ExtendedBaseResponse.of(response, "The Comment was eliminated."));
    }
}