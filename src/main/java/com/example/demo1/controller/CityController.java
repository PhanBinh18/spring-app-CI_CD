package com.example.demo1.controller;

import com.example.demo1.entity.City;
import com.example.demo1.repository.CityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cities")
@CrossOrigin(origins = "*")
public class CityController {

    @Autowired
    private CityRepository cityRepository;

    @GetMapping("/search")
    public ResponseEntity<List<City>> searchCities(@RequestParam("name") String name) {
        // Lấy danh sách thành phố có tên bắt đầu bằng từ khóa
        List<City> cities = cityRepository.findByNameStartingWithIgnoreCase(name);
        return ResponseEntity.ok(cities);
    }
}
