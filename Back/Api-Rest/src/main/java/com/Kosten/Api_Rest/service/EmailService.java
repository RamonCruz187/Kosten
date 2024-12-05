package com.Kosten.Api_Rest.service;

public interface EmailService {
    void sendEmail(String to, String subject, String text);
}
