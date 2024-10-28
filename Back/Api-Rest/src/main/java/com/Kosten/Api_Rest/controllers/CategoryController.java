package com.Kosten.Api_Rest.controllers;

import com.Kosten.Api_Rest.dto.BaseResponse;
import com.Kosten.Api_Rest.dto.ExtendedBaseResponse;
import com.Kosten.Api_Rest.dto.category.CategoryRequestDTO;
import com.Kosten.Api_Rest.dto.category.CategoryResponseDTO;
import com.Kosten.Api_Rest.dto.category.CategoryToUpdateDTO;
import com.Kosten.Api_Rest.service.CategoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Categoría", description = "Maneja todos los endpoints de categoría .")
@RestController
@RequestMapping("/category")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @Operation(
            summary = "Crear una nueva categoría.",
            description = "Permite a un administrador crear una nueva categoría."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "201", description = "Categoría creada exitosamente.",
                    content = {
                            @Content(mediaType = "application/json",
                                    schema = @Schema(implementation = ExtendedBaseResponse.class))
                    }),
            @ApiResponse(responseCode = "400", description = "Bad request.", content = {@Content}),
            @ApiResponse(responseCode = "401", description = "Unauthorized.", content = {@Content}),
            @ApiResponse(responseCode = "403", description = "Forbidden access to this resource", content = {@Content}),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = {@Content})
    })
    @PostMapping(value = "/new")
    @Transactional
    public ResponseEntity<ExtendedBaseResponse<CategoryResponseDTO>> newCategory(@RequestBody CategoryRequestDTO requestDto) {
        try {
            return ResponseEntity.status(200).body(categoryService.newCategory(requestDto));
        } catch (Exception e) {
            throw new RuntimeException("No se ha podido crear la categoría");
        }

    }

    @Operation(
            summary = "Actualizar una categoría.",
            description = "Permite a un admin de la empresa actualizar una categoría."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200", description = "Categoría actualizada exitosamente.",
                    content = {
                            @Content(mediaType = "application/json",
                                    schema = @Schema(implementation = ExtendedBaseResponse.class))
                    }),
            @ApiResponse(responseCode = "400", description = "Bad request.", content = {@Content}),
            @ApiResponse(responseCode = "401", description = "Unauthorized.", content = {@Content}),
            @ApiResponse(responseCode = "403", description = "Forbidden.", content = {@Content}),
            @ApiResponse(responseCode = "404", description = "Categoría no encontrada.", content = {@Content}),
            @ApiResponse(responseCode = "500", description = "Server error.", content = {@Content})
    })
    @PutMapping("/update")
    @Transactional
    public ResponseEntity<ExtendedBaseResponse<CategoryResponseDTO>> updateCategory(@RequestBody CategoryToUpdateDTO requestDto) {
        try {
            return ResponseEntity.status(200).body(categoryService.updateCategory(requestDto));
        } catch (Exception e) {
            throw new RuntimeException("No se ha podido actualizar la categoría");
        }

    }


    @Operation(
            summary = "Obtiene todas las categorías.",
            description = "Permite a un admin de la empresa ver todas las categorías."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200", description = "Categorías obtenidas exitosamente.",
                    content = {
                            @Content(mediaType = "application/json",
                                    schema = @Schema(implementation = ExtendedBaseResponse.class))
                    }),
            @ApiResponse(responseCode = "400", description = "Bad request.", content = {@Content}),
            @ApiResponse(responseCode = "401", description = "Unauthorized.", content = {@Content}),
            @ApiResponse(responseCode = "403", description = "Forbidden.", content = {@Content}),
            @ApiResponse(responseCode = "404", description = "Categorías no encontradas.", content = {@Content}),
            @ApiResponse(responseCode = "500", description = "Server error.", content = {@Content})
    })
    @GetMapping("/all")
    @Transactional
    public ResponseEntity<ExtendedBaseResponse<List<CategoryResponseDTO>>> getAllCategories() {
        try {
            return ResponseEntity.status(200).body(categoryService.getAllCategories());
        } catch (Exception e) {
            throw new RuntimeException("No se ha podido obtener las categorías");
        }

    }


    @Operation(
            summary = "Obtiene una categoría por su ID.",
            description = "Permite a un admin de la empresa obtener una categoría por su ID."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200", description = "Categoría obtenida exitosamente.",
                    content = {
                            @Content(mediaType = "application/json",
                                    schema = @Schema(implementation = ExtendedBaseResponse.class))
                    }),
            @ApiResponse(responseCode = "400", description = "Bad request.", content = {@Content}),
            @ApiResponse(responseCode = "401", description = "Unauthorized.", content = {@Content}),
            @ApiResponse(responseCode = "403", description = "Forbidden.", content = {@Content}),
            @ApiResponse(responseCode = "404", description = "Categoría no encontrada.", content = {@Content}),
            @ApiResponse(responseCode = "500", description = "Server error.", content = {@Content})
    })
    @GetMapping("/{id}")
    @Transactional
    public ResponseEntity<ExtendedBaseResponse<CategoryResponseDTO>> getCategoryById(@PathVariable Long id) {
        try {
            return ResponseEntity.status(200).body(categoryService.getCategory(id));
        } catch (Exception e) {
            throw new RuntimeException("No se ha podido obtener la categoría");
        }

    }


    @Operation(
            summary = "Eliminar una categoría.",
            description = "Permite a un admin de la empresa eliminar una categoría."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200", description = "Categoría eliminada exitosamente.",
                    content = {
                            @Content(mediaType = "application/json",
                                    schema = @Schema(implementation = BaseResponse.class))
                    }),
            @ApiResponse(responseCode = "400", description = "Bad request.", content = {@Content}),
            @ApiResponse(responseCode = "401", description = "Unauthorized.", content = {@Content}),
            @ApiResponse(responseCode = "403", description = "Forbidden.", content = {@Content}),
            @ApiResponse(responseCode = "404", description = "Categoría no encontrada.", content = {@Content}),
            @ApiResponse(responseCode = "500", description = "Server error.", content = {@Content})
    })
    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<BaseResponse> deleteCategory(@PathVariable Long id) {
        try {
            return ResponseEntity.status(200).body(categoryService.deleteCategory(id));
        } catch (Exception e) {
            throw new RuntimeException("No se ha podido borrar la categoría");

        }
    }
}
