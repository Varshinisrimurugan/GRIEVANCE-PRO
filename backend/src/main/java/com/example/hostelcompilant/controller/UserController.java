package com.example.hostelcompilant.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.example.hostelcompilant.dto.UserrequestDto;
import com.example.hostelcompilant.dto.UserresponseDto;
import com.example.hostelcompilant.service.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/users")
    public ResponseEntity<?> userCreate(@RequestBody UserrequestDto userRequestDto) {

        try {

            System.out.println("===== CREATE USER API CALLED =====");

            userService.createUser(userRequestDto);

            return ResponseEntity.ok("User Created Successfully");

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error : " + e.getMessage());
        }
    }

    @GetMapping("/users")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<UserresponseDto>> getUserList() {

        return ResponseEntity.ok(userService.getAllUsers());
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {

        userService.deleteUserbyId(id);

        return ResponseEntity.ok("User Deleted Successfully");
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<String> updateUser(
            @PathVariable Long id,
            @RequestBody UserrequestDto userRequestDto) {

        userService.updateUser(id, userRequestDto);

        return ResponseEntity.ok("User Updated Successfully");
    }

    @PatchMapping("/users/{id}")
    public ResponseEntity<String> patchUser(
            @PathVariable Long id,
            @RequestBody UserrequestDto userRequestDto) {

        userService.patchUser(id, userRequestDto);

        return ResponseEntity.ok("User Updated Successfully");
    }
}