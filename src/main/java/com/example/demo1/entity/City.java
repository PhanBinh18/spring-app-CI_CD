package com.example.demo1.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "city")
public class City {

    @Id
    private Integer id;

    @Column(name = "Name", columnDefinition = "char(3)") // Ánh xạ tới cột 'Name'
    private String name;

    @Column(name = "CountryCode", columnDefinition = "char(3)")
    private String countryCode;

    @Column(name = "District", columnDefinition = "char(3)")
    private String district;

    @Column(name = "Population", columnDefinition = "char(3)")
    private Integer population;

    // Getters and Setters
    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getCountryCode() {
        return countryCode;
    }
    public void setCountryCode(String countryCode) {
        this.countryCode = countryCode;
    }
    public String getDistrict() {
        return district;
    }
    public void setDistrict(String district) {
        this.district = district;
    }
    public Integer getPopulation() {
        return population;
    }
    public void setPopulation(Integer population) {
        this.population = population;
    }
}