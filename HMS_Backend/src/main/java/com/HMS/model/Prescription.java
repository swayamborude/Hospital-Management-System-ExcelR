package com.HMS.model;

import com.HMS.model.embedded.Diagnosis;
import com.HMS.model.embedded.Medicine;
import jakarta.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
public class Prescription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "appointment_id", nullable = false)
    private Appointment appointment;

    @ManyToOne
    @JoinColumn(name = "patient_id")
    private User patient;

    @ManyToOne
    @JoinColumn(name = "doctor_id")
    private Doctor doctor;

    @ElementCollection
    @CollectionTable(name = "prescription_medicines", joinColumns = @JoinColumn(name = "prescription_id"))
    private List<Medicine> medicines;

    @ElementCollection
    @CollectionTable(name = "prescription_diagnoses", joinColumns = @JoinColumn(name = "prescription_id"))
    private List<Diagnosis> diagnoses;

    @Column(length = 1000)
    private String notes;

    private Date prescriptionDate;

    // Default Constructor
    public Prescription() {
    }

    // Parameterized Constructor
    public Prescription(Long id, Appointment appointment, List<Medicine> medicines, List<Diagnosis> diagnoses, String notes, Date prescriptionDate) {
        this.id = id;
        this.appointment = appointment;
        this.medicines = medicines;
        this.diagnoses = diagnoses;
        this.notes = notes;
        this.prescriptionDate = prescriptionDate;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Appointment getAppointment() {
        return appointment;
    }

    public void setAppointment(Appointment appointment) {
        this.appointment = appointment;
    }

    public List<Medicine> getMedicines() {
        return medicines;
    }

    public void setMedicines(List<Medicine> medicines) {
        this.medicines = medicines;
    }

    public List<Diagnosis> getDiagnoses() {
        return diagnoses;
    }

    public void setDiagnoses(List<Diagnosis> diagnoses) {
        this.diagnoses = diagnoses;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public Date getPrescriptionDate() {
        return prescriptionDate;
    }

    public void setPrescriptionDate(Date prescriptionDate) {
        this.prescriptionDate = prescriptionDate;
    }

    // toString Method
    @Override
    public String toString() {
        return "Prescription{" +
                "id=" + id +
                ", appointment=" + appointment +
                ", medicines=" + medicines +
                ", diagnoses=" + diagnoses +
                ", notes='" + notes + '\'' +
                ", prescriptionDate=" + prescriptionDate +
                '}';
    }

    public void setPatient(User patient) {
    }

    public void setDoctor(Doctor doctor) {
    }
}
