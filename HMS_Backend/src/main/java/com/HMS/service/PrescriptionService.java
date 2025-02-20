package com.HMS.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.HMS.model.Appointment;
import com.HMS.model.Doctor;
import com.HMS.model.Prescription;
import com.HMS.model.User;
import com.HMS.repository.AppointmentRepo;
import com.HMS.repository.DoctorRepo;
import com.HMS.repository.PrescriptionRepo;
import com.HMS.repository.UserRepo;

@Service
public class PrescriptionService {

    @Autowired
    private PrescriptionRepo prescriptionRepo;

    @Autowired
    private AppointmentRepo appointmentRepo;

    @Autowired
    private DoctorRepo doctorRepo;

    @Autowired
    private UserRepo userRepo;

    // Get all prescriptions
    public List<Prescription> getAllPrescriptions() {
        return prescriptionRepo.findAll();
    }

    // Get prescriptions by patient ID
    public List<Prescription> getPrescriptionsByPatientId(Long patientId) {
        Optional<User> patient = userRepo.findById(patientId);
        if (patient.isPresent()) {
            return prescriptionRepo.findByPatient(patient.get());
        } else {
            // Return empty list if patient is not found
            return List.of();
        }
    }

    // Get prescriptions by doctor email
    public List<Prescription> getPrescriptionsByDoctorEmail(String email) {
        Optional<User> user = userRepo.findByEmail(email);
        if (user.isPresent()) {
            Optional<Doctor> doctor = doctorRepo.findByUser(user.get());
            if (doctor.isPresent()) {
                return prescriptionRepo.findByDoctor(doctor.get());
            }
        }
        // Return empty list if no doctor or user is found
        return List.of();
    }

    // Submit a prescription
    public Prescription submitPrescription(Long appointmentId, Prescription prescription, String doctorEmail) {
        Optional<User> doctorUserOpt = userRepo.findByEmail(doctorEmail);
        if (doctorUserOpt.isPresent()) {
            User doctorUser = doctorUserOpt.get();
            Optional<Doctor> doctorOpt = doctorRepo.findByUser(doctorUser);
            if (doctorOpt.isPresent()) {
                Doctor doctor = doctorOpt.get();

                // Fetch the appointment
                Optional<Appointment> appointmentOpt = appointmentRepo.findById(appointmentId);
                if (appointmentOpt.isPresent()) {
                    Appointment appointment = appointmentOpt.get();

                    if (appointment.getPatient() != null) {
                        prescription.setPatient(appointment.getPatient());
                        prescription.setDoctor(doctor);
                        prescription.setAppointment(appointment);

                        // Save and return the prescription
                        return prescriptionRepo.save(prescription);
                    } else {
                        // If the appointment has no patient
                        return null;
                    }
                }
            }
        }
        return null;  // Return null if user or doctor/appointment is not found
    }

    // Update a prescription
    public Prescription updatePrescription(Long prescriptionId, Prescription updatedPrescription) {
        Optional<Prescription> existingPrescriptionOpt = prescriptionRepo.findById(prescriptionId);
        if (existingPrescriptionOpt.isPresent()) {
            Prescription existingPrescription = existingPrescriptionOpt.get();

            // Update the fields of the prescription
            existingPrescription.setMedicines(updatedPrescription.getMedicines());
            existingPrescription.setNotes(updatedPrescription.getNotes());
            existingPrescription.setPrescriptionDate(updatedPrescription.getPrescriptionDate());

            // Save and return the updated prescription
            return prescriptionRepo.save(existingPrescription);
        }
        return null;  // Return null if the prescription is not found
    }

    // Delete a prescription
    public boolean deletePrescription(Long prescriptionId) {
        Optional<Prescription> prescriptionOpt = prescriptionRepo.findById(prescriptionId);
        if (prescriptionOpt.isPresent()) {
            prescriptionRepo.delete(prescriptionOpt.get());
            return true;
        }
        return false;  // Return false if the prescription was not found
    }
}
