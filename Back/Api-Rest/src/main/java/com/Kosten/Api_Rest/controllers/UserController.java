package com.Kosten.Api_Rest.controllers;

import com.Kosten.Api_Rest.dto.BaseResponse;
import com.Kosten.Api_Rest.dto.ExtendedBaseResponse;
import com.Kosten.Api_Rest.dto.user.*;
import com.Kosten.Api_Rest.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Usuarios", description = "Gestionar los usuarios.")
@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @Operation(
            summary = "Actualizar usuario",
            description = "Actualiza los datos de un usuario existente."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Usuario actualizado exitosamente",
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = UserResponseDto.class)
                    )
            ),
            @ApiResponse(responseCode = "400", description = "Solicitud inválida"),
            @ApiResponse(responseCode = "500", description = "Error del servidor")
    })
    @PutMapping(value = "/update", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ExtendedBaseResponse<UserResponseDto>> updateUser(
            @RequestBody @Valid UpdateUserRequestDto updateUser) {

        return ResponseEntity.status(200).body(userService.update(updateUser));
    }

    @Operation(summary = "Buscar usuario por ID", description = "Obtiene los detalles de un usuario por su ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Usuario encontrado"),
            @ApiResponse(responseCode = "404", description = "Usuario no encontrado")
    })
    @GetMapping("/{id}")
    @Transactional
    public ResponseEntity<ExtendedBaseResponse<UserPackDepDto>> findUserById(@PathVariable Long id){

        return ResponseEntity.status(200).body(userService.getUserById(id));
    }

    @Operation(summary = "Actualizar rol del usuario", description = "Modifica el rol de un usuario.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Rol de usuario actualizado exitosamente"),
            @ApiResponse(responseCode = "400", description = "Solicitud inválida"),
            @ApiResponse(responseCode = "404", description = "Usuario no encontrado")
    })
    @PutMapping("/{id}/role")
    @Transactional
    public ResponseEntity<ExtendedBaseResponse<UserResponseDto>> updateUserRole(
            @PathVariable Long id,
            @RequestBody UserRoleUpdateRequestDto requestDto){

        return ResponseEntity.status(200).body(userService.updateUserRole(id, requestDto));
    }

    @Operation(summary = "Obtener todos los usuarios", description = "Recupera una lista de todos los usuarios.")
    @ApiResponse(responseCode = "200", description = "Lista de usuarios obtenida exitosamente")
    @GetMapping("/all")
    @Transactional
    public ResponseEntity<ExtendedBaseResponse<List<UserToBeListed>>> getAllUsers() {
        return ResponseEntity.status(200).body(userService.getAllUsers());
    }

    @Operation(summary = "Eliminar usuario", description = "Elimina un usuario por su ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Usuario eliminado exitosamente"),
            @ApiResponse(responseCode = "404", description = "Usuario no encontrado")
    })
    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<BaseResponse> deleteUser(@PathVariable Long id){
        return ResponseEntity
                .status(200)
                .body(userService.delete(id));
    }

    @Operation(summary = "Obtener usuarios activos", description = "Recupera una lista de todos los usuarios activos.")
    @ApiResponse(responseCode = "200", description = "Lista de usuarios activos obtenida exitosamente")
    @GetMapping("/actives")
    public ResponseEntity<ExtendedBaseResponse<List<UserToBeListed>>> getAllActivesUsers() {
        return ResponseEntity.status(200).body(userService.getAllActivesUsers());
    }

    @Operation(summary = "Actualizar estado activo del usuario", description = "Actualiza el estado activo/inactivo de un usuario.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Estado de usuario actualizado exitosamente"),
            @ApiResponse(responseCode = "400", description = "Solicitud inválida")
    })
    @PutMapping("/isActive")
    public ExtendedBaseResponse<UserResponseDto> updateUserIsActive(
            @RequestBody @Valid UserIsActiveDto userIsActiveDto) {
        UserResponseDto updatedUser = userService.updateUserIsActive(userIsActiveDto);
        BaseResponse response = BaseResponse.ok("Estado de usuario actualizado exitosamente.");
        return ExtendedBaseResponse.of(response, updatedUser);
    }

}
