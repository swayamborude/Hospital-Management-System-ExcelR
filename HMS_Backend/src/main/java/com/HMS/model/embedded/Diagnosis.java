package com.HMS.model.embedded;

import jakarta.persistence.Embeddable;


@Embeddable
public class Diagnosis {
    private String diagnosis;
    private String instructions;

    public Diagnosis(String diagnosis, String instructions) {
        this.diagnosis = diagnosis;
        this.instructions = instructions;
    }

    public String getDiagnosis() {
        return diagnosis;
    }

    public void setDiagnosis(String diagnosis) {
        this.diagnosis = diagnosis;
    }

    public String getInstructions() {
        return instructions;
    }

    public void setInstructions(String instructions) {
        this.instructions = instructions;
    }

    @Override
    public String toString() {
        return "Diagnosis{" +
                "diagnosis='" + diagnosis + '\'' +
                ", instructions='" + instructions + '\'' +
                '}';
    }
// Getters and Setters
}