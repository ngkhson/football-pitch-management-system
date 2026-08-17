package com.fpms.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class TestController {

    @GetMapping("/test")
    public String testConnection() {
        return "Kết nối thành công! Dữ liệu được gửi từ Spring Boot Backend.";
    }
}
