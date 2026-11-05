package com.example.hostelcompilant.serviceImplementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.example.hostelcompilant.service.EmailService;

@Service
public class EmailServiceImplementation implements EmailService {

    @Autowired
    private JavaMailSender mailSender;

    private static final String FROM_EMAIL = "mailtovarshini2005@gmail.com";

    @Override
    public void sendEmail(String[] to, String subject, String text) {

        SimpleMailMessage message = new SimpleMailMessage();

        // sender mail
        message.setFrom(FROM_EMAIL);

        // receiver mail(s)
        message.setTo(to);

        // subject
        message.setSubject(subject);

        // body
        message.setText(text);

        // send mail
        mailSender.send(message);
    }
}