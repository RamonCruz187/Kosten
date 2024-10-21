package com.Kosten.Api_Rest.model;

import jakarta.persistence.Embeddable;

@Embeddable
public class MonthNames {

    private String name;
    private String short_name;

    public MonthNames() {}

    public MonthNames(String name, String shortName) {
        this.name = name;
        this.short_name = shortName;
    }

    // Getters y setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getShortName() {
        return short_name;
    }

    public void setShortName(String shortName) {
        this.short_name = shortName;
    }
}
