package com.HMS.service;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.HMS.model.Appointment;
import com.HMS.model.AppointmentStatus;
import com.HMS.model.Doctor;
import com.HMS.model.RoleType;
import com.HMS.model.User;
import com.HMS.repository.AppointmentRepo;
import com.HMS.repository.DoctorRepo;
import com.HMS.repository.UserRepo;

@Service
public class AppointmentService {

    @Autowired
    private UserRepo userRepo;
    
    @Autowired
    private DoctorRepo doctorRepo;
    
    @Autowired
    private AppointmentRepo appointmentRepo;
    
    @Autowired
    private EmailService emailService;
    
    // Doctor's working hours
    private static final LocalTime DOCTOR_START_TIME = LocalTime.of(11, 0);  // 11:00 AM
    private static final LocalTime DOCTOR_END_TIME = LocalTime.of(20, 0);    // 8:00 PM


    public Appointment createAppointment(String email, Long doctorId, LocalDateTime appointmentDate, String description) {
        Optional<User> patientOpt = userRepo.findByEmail(email);
        Optional<Doctor> doctorOpt = doctorRepo.findById(doctorId);

        if (patientOpt.isEmpty() || doctorOpt.isEmpty()) {
            throw new IllegalArgumentException("Invalid Patient or Doctor ID.");
        }

     // Check if the appointment time is within doctor's working hours
        if (!isWithinDoctorHours(appointmentDate)) {
            throw new IllegalArgumentException("Appointments can only be scheduled between 11am and 8pm.");
        }

        User patient = patientOpt.get();
        Doctor doctor = doctorOpt.get();



        Appointment appointment = new Appointment();
        appointment.setPatient(patient);
        appointment.setDoctor(doctor);
        appointment.setAppointmentDate(appointmentDate);
        appointment.setDescription(description);

        return appointmentRepo.save(appointment);
    }

    // Helper method to check if the appointment time is within doctor's working hours
    private boolean isWithinDoctorHours(LocalDateTime appointmentDate) {
        LocalTime appointmentTime = appointmentDate.toLocalTime();
        return !appointmentTime.isBefore(DOCTOR_START_TIME) && !appointmentTime.isAfter(DOCTOR_END_TIME);
    }
    
//    public List<Appointment> getAppointmentsForDoctor(Long doctorId) {
//        return userRepo.findById(doctorId)
//                       .map(appointmentRepo::findByDoctor)
//                       .orElseThrow(() -> new IllegalArgumentException("Doctor not found"));
//    }
//
//    public List<Appointment> getAppointmentsForPatient(Long patientId) {
//        return userRepo.findById(patientId)
//                       .map(appointmentRepo::findByPatient)
//                       .orElseThrow(() -> new IllegalArgumentException("Patient not found"));
//    }
    
 // Get Appointments for Patient
    public List<Appointment> getAppointmentsForPatient(String email) {
        // Retrieve the user based on the email and check if they have the PATIENT role
        User patientUser = userRepo.findByEmailAndRoles_Name(email, RoleType.PATIENT);

        if (patientUser == null) {
            throw new IllegalArgumentException("The logged-in user is not a patient.");
        }

        // Fetch appointments where the patient is this user
        return appointmentRepo.findByPatient(patientUser);
    }


    // Get Appointments for Doctor
    public List<Appointment> getAppointmentsForDoctor(String email) {
        // Retrieve the user based on the email and check if the role is DOCTOR
        User doctorUser = userRepo.findByEmailAndRoles_Name(email, RoleType.DOCTOR);

        if (doctorUser == null) {
            throw new IllegalArgumentException("The logged-in user is not a doctor.");
        }
        
        // Get the doctor entity (doctorUser has a doctor reference)
        Doctor doctor = doctorUser.getDoctor();

        if (doctor == null) {
            throw new IllegalArgumentException("Doctor details not found.");
        }

        // Get appointments for the authenticated doctor
        return appointmentRepo.findByDoctor_User_Email(email);

         }
    
    //Patient can reschedule Appointment
    public Appointment rescheduleAppointment(Long appointmentId, String patientEmail, LocalDateTime newAppointmentDate) {
        // Retrieve the appointment by ID
        Appointment appointment = appointmentRepo.findById(appointmentId)
                .orElseThrow(() -> new IllegalArgumentException("Appointment not found"));
        
        // Verify that the appointment belongs to the patient who is rescheduling
        if (!appointment.getPatient().getEmail().equals(patientEmail)) {
            throw new IllegalArgumentException("You are not authorized to reschedule this appointment.");
        }

        // Update the appointment date and save
        appointment.setAppointmentDate(newAppointmentDate);
        
        return appointmentRepo.save(appointment);
    }
    
    //Patient can cancel the Appointment
    public Appointment cancelAppointment(Long appointmentId, String patientEmail) {
        // Retrieve the appointment by ID
        Appointment appointment = appointmentRepo.findById(appointmentId)
                .orElseThrow(() -> new IllegalArgumentException("Appointment not found"));
        
        // Verify that the appointment belongs to the patient who is canceling
        if (!appointment.getPatient().getEmail().equals(patientEmail)) {
            throw new IllegalArgumentException("You are not authorized to cancel this appointment.");
        }
        
        // Cancel the appointment (you could delete it or set a canceled status)
        appointmentRepo.delete(appointment);  // Deletes the appointment
        
        return appointment;
    }
    
    
    // Cancel all appointments of an inactive doctor
    public void cancelAppointmentsByDoctor(Doctor doctor) {
        List<Appointment> appointments = appointmentRepo.findByDoctorAndAppointmentDateAfter(doctor, LocalDateTime.now());

        for (Appointment appointment : appointments) {
            appointment.setStatus(AppointmentStatus.CANCELLED); // Ensure to have a CANCELLED status in your Appointment model
            appointmentRepo.save(appointment); // Save each updated appointment status
        }
        
        System.out.println("Appointments cancelled for Doctor ID: " + doctor.getDoctorId());
    }

    
    
    // Get the currently authenticated user's email
    public String getAuthenticatedUserEmail() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }
}
