package com.example.hostelcompilant.service;

public interface EmailService {
    void sendEmail(String[] to, String subject, String text);
}