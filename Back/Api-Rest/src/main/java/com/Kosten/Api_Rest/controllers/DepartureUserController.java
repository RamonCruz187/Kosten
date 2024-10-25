package com.Kosten.Api_Rest.controllers;

import com.Kosten.Api_Rest.dto.BaseResponse;
import com.Kosten.Api_Rest.dto.Departure.DepartureResponseDto;
import com.Kosten.Api_Rest.dto.Departure.DepartureToBeListed;
import com.Kosten.Api_Rest.dto.user.UserResponseDto;
import com.Kosten.Api_Rest.dto.user.UserToBeListed;
import com.Kosten.Api_Rest.model.Departure;
import com.Kosten.Api_Rest.model.User;
import com.Kosten.Api_Rest.service.IDepartureService;
import com.Kosten.Api_Rest.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/departure-user")
public class DepartureUserController {
    @Autowired
    IDepartureService departureService;
    @Autowired
    UserService userService;


    @PatchMapping("/departures/{departureId}/users/{userId}")
    public ResponseEntity<BaseResponse> addUserToDeparture(
            @PathVariable Integer departureId,
            @PathVariable Long userId) {
        departureService.addUserToDeparture(userId, departureId);
        return ResponseEntity.ok(BaseResponse.ok("User added to departure successfully"));
    }

    @DeleteMapping("/departures/{departureId}/users/{userId}")
    public ResponseEntity<Void> removeUserFromDeparture(
            @PathVariable Integer departureId,
            @PathVariable Long userId) {
        departureService.removeUserFromDeparture(departureId, userId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/departures/{departureId}/users")
    public ResponseEntity<List<UserToBeListed>> getUsersByDeparture(@PathVariable Integer departureId) {
        List<UserToBeListed> users = departureService.getUsersByDepartureId(departureId);
        return ResponseEntity.ok(users);
    }

    @GetMapping("/users/{userId}/departures")
    public ResponseEntity<List<DepartureToBeListed>> getDeparturesByUser(@PathVariable Long userId) {
        List<DepartureToBeListed> departures = userService.getDeparturesByUserId(userId);
        return ResponseEntity.ok(departures);
    }





    @GetMapping("/departures")
    public ResponseEntity<List<DepartureResponseDto>> getAllDeparturesWithUsers() {
        List<DepartureResponseDto> departures = departureService.getAllDeparturesWithUsers();
        return ResponseEntity.ok(departures);
    }

    @GetMapping("/users")
    public ResponseEntity<List<UserResponseDto>> getAllUsersWithDepartures() {
        List<UserResponseDto> users = userService.getAllUsersWithDepartures();
        return ResponseEntity.ok(users);
    }

}
