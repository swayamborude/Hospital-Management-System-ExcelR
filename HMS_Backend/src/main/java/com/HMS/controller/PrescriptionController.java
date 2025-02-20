package com.HMS.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.HMS.model.Prescription;
import com.HMS.service.PrescriptionService;

@RestController
@RequestMapping("/api/prescriptions")
@CrossOrigin(origins = "http://localhost:5173")
public class PrescriptionController {

    @Autowired
    private PrescriptionService prescriptionService;

    // Get all prescriptions
    @GetMapping
    @PreAuthorize("hasAuthority('DOCTOR') or hasAuthority('ADMIN')")
    public List<Prescription> getAllPrescriptions() {
        return prescriptionService.getAllPrescriptions();
    }

    // Get prescriptions by patient ID
    @GetMapping("/patient/{patientId}")
    @PreAuthorize("hasAuthority('DOCTOR') or hasAuthority('PATIENT')")
    public ResponseEntity<List<Prescription>> getPrescriptionsByPatientId(@PathVariable Long patientId) {
        List<Prescription> prescriptions = prescriptionService.getPrescriptionsByPatientId(patientId);
        return ResponseEntity.ok(prescriptions);
    }

    // Submit a new prescription
    @PostMapping("/{appointmentId}/submit")
    @PreAuthorize("hasAuthority('DOCTOR')")
    public ResponseEntity<?> submitPrescription(
            @PathVariable Long appointmentId,
            @RequestBody Prescription prescription,
            Principal principal) {
        try {
            String doctorEmail = principal.getName();
            Prescription savedPrescription = prescriptionService.submitPrescription(appointmentId, prescription, doctorEmail);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedPrescription);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Submission failed: " + e.getMessage());
        }
    }

    // Update a prescription
    @PutMapping("/{prescriptionId}")
    @PreAuthorize("hasAuthority('DOCTOR')")
    public ResponseEntity<?> updatePrescription(
            @PathVariable Long prescriptionId,
            @RequestBody Prescription updatedPrescription) {
        try {
            Prescription prescription = prescriptionService.updatePrescription(prescriptionId, updatedPrescription);
            return ResponseEntity.ok(prescription);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Update failed: " + e.getMessage());
        }
    }

    // Delete a prescription
    @DeleteMapping("/{prescriptionId}")
    @PreAuthorize("hasAuthority('DOCTOR') or hasAuthority('ADMIN')")
    public ResponseEntity<?> deletePrescription(@PathVariable Long prescriptionId) {
        try {
            prescriptionService.deletePrescription(prescriptionId);
            return ResponseEntity.ok("Prescription deleted successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Delete failed: " + e.getMessage());
        }
    }

    // Get prescriptions for the authenticated doctor
    @GetMapping("/doctor/me")
    @PreAuthorize("hasAuthority('DOCTOR')")
    public ResponseEntity<List<Prescription>> getPrescriptionsForAuthenticatedDoctor(Principal principal) {
        String email = principal.getName();
        List<Prescription> prescriptions = prescriptionService.getPrescriptionsByDoctorEmail(email);
        return ResponseEntity.ok(prescriptions);
    }
}
