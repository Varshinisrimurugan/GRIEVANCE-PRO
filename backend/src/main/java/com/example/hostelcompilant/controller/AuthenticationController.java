package com.example.hostelcompilant.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.hostelcompilant.dto.LoginRequestDto;
import com.example.hostelcompilant.entity.User;
import com.example.hostelcompilant.service.EmailService;
import com.example.hostelcompilant.service.UserService;
import com.example.hostelcompilant.util.JwtUtil;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserService userService;

    @Autowired
    private EmailService emailService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDto request) {

        try {

            System.out.println("========== LOGIN REQUEST ==========");
            System.out.println("Email : " + request.getEmail());

            User user = userService.findByEmail(request.getEmail());

            System.out.println("User object : " + user);

            if (user == null) {

                System.out.println("User Not Found");

                return ResponseEntity
                        .status(HttpStatus.UNAUTHORIZED)
                        .body("User Not Found");
            }

            System.out.println("Database Email : " + user.getEmail());
            System.out.println("Database Password : " + user.getPassword());

            authenticationManager.authenticate(

                    new UsernamePasswordAuthenticationToken(

                            request.getEmail(),
                            request.getPassword())

            );

            String token = jwtUtil.generateToken(user);

            // Send Email
            try {

                String[] to = { user.getEmail() };

                emailService.sendEmail(

                        to,

                        "Hostel Complaint Login Token",

                        "Hello " + user.getName()
                                + "\n\nYour JWT Token:\n\n"
                                + token
                                + "\n\nThanks,\nGrievancePro Team"

                );

            } catch (Exception mailException) {

                System.out.println("Email Sending Failed");
                mailException.printStackTrace();

            }

            Map<String, Object> response = new HashMap<>();

            response.put("message", "Login Successful");
            response.put("token", token);
            response.put("userId", user.getId());
            response.put("name", user.getName());
            response.put("email", user.getEmail());

            response.put(
                    "roles",
                    user.getRole()
                            .stream()
                            .map(role -> role.getRoleName())
                            .toList()
            );

            // ================= DEBUG =================

            System.out.println("========== LOGIN RESPONSE ==========");

            System.out.println("User ID : " + user.getId());

            System.out.println("User Name : " + user.getName());

            System.out.println("Email : " + user.getEmail());

            System.out.println("Roles : " +
                    user.getRole()
                            .stream()
                            .map(role -> role.getRoleName())
                            .toList());

            System.out.println("Token : " + token);

            System.out.println("Response Map : " + response);

            System.out.println("====================================");

            return ResponseEntity.ok(response);

        }

        catch (BadCredentialsException e) {

            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid Email or Password");

        }

        catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Login Failed : " + e.getMessage());

        }

    }

}