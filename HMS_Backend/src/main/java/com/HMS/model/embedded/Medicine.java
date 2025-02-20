package com.HMS.model.embedded;

import jakarta.persistence.Embeddable;

@Embeddable
public class Medicine {
    private String name;
    private String type;
    private String instructions;

    public Medicine(String name, String type, String instructions) {
        this.name = name;
        this.type = type;
        this.instructions = instructions;
    }
// Getters and Setters

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getInstructions() {
        return instructions;
    }

    public void setInstructions(String instructions) {
        this.instructions = instructions;
    }

    @Override
    public String toString() {
        return "Medicine{" +
                "name='" + name + '\'' +
                ", type='" + type + '\'' +
                ", instructions='" + instructions + '\'' +
                '}';
    }
}