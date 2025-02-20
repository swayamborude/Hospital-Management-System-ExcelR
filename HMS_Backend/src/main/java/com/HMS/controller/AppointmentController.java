package com.HMS.controller;

import com.HMS.model.Appointment;
import com.HMS.model.AppointmentDTO;
import com.HMS.model.CustomAppointmentResponse;
import com.HMS.model.Doctor;
import com.HMS.model.User;
import com.HMS.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @PostMapping("/book")
    @PreAuthorize("hasAuthority('PATIENT')")
    public CustomAppointmentResponse createAppointment(@RequestBody AppointmentDTO appointmentDTO, Principal principal) {
        String email = principal.getName();

        // Create the appointment and retrieve the complete appointment info with doctor details
        Appointment appointment = appointmentService.createAppointment(
                email,
                appointmentDTO.getDoctorId(),
                appointmentDTO.getAppointmentDate(),
                appointmentDTO.getDescription()
        );

        Doctor doctor = appointment.getDoctor();
        String doctorFullName = doctor.getUser().getFirstName() + " " + doctor.getUser().getLastName();
        String doctorDegree = doctor.getDegree();
        String doctorQualification = doctor.getQualification();

        // Create and return response
        return new CustomAppointmentResponse(
                "Appointment created successfully!",
                appointment,
                doctorFullName,
                doctorDegree,
                doctorQualification
        );

         }


//    @GetMapping("/doctor/{doctorId}")
//    public List<Appointment> getAppointmentsForDoctor(@PathVariable Long doctorId) {
//        return appointmentService.getAppointmentsForDoctor(doctorId);
//    }
//
//    @GetMapping("/patient/{patientId}")
//    public List<Appointment> getAppointmentsForPatient(@PathVariable Long patientId) {
//        return appointmentService.getAppointmentsForPatient(patientId);
//    }

 // Endpoint for doctors to view their appointments
    @GetMapping("/doctor")
    @PreAuthorize("hasAuthority('DOCTOR')")
    public ResponseEntity<List<Appointment>> getAppointmentsForDoctor(Principal principal) {
        String email = principal.getName();
        List<Appointment> appointments = appointmentService.getAppointmentsForDoctor(email);

        return appointments != null && !appointments.isEmpty()
               ? ResponseEntity.ok(appointments)
               : ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @GetMapping("/patient")
    @PreAuthorize("hasAuthority('PATIENT')")
    public ResponseEntity<List<Appointment>> getAppointmentsForPatient(Principal principal) {
        String email = principal.getName(); // Get the email of the logged-in patient
        List<Appointment> appointments = appointmentService.getAppointmentsForPatient(email);

        return appointments != null && !appointments.isEmpty()
               ? ResponseEntity.ok(appointments)
               : ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }


    @PutMapping("/reschedule")
    @PreAuthorize("hasAuthority('PATIENT')")
    public ResponseEntity<CustomAppointmentResponse> rescheduleAppointment(
            @RequestBody AppointmentDTO appointmentDTO, Principal principal) {

        String email = principal.getName(); // Get logged-in patient’s email

        // Call service to reschedule the appointment
        Appointment updatedAppointment = appointmentService.rescheduleAppointment(
                appointmentDTO.getAppointmentId(), email, appointmentDTO.getAppointmentDate());

        Doctor doctor = updatedAppointment.getDoctor();
        String doctorFullName = doctor.getUser().getFirstName() + " " + doctor.getUser().getLastName();
        String doctorDegree = doctor.getDegree();
        String doctorQualification = doctor.getQualification();

        CustomAppointmentResponse response = new CustomAppointmentResponse(
                "Appointment rescheduled successfully!",
                updatedAppointment,
                doctorFullName,
                doctorDegree,
                doctorQualification
        );

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/cancel")
    @PreAuthorize("hasAuthority('PATIENT')")
    public ResponseEntity<String> cancelAppointment(@RequestBody AppointmentDTO appointmentDTO, Principal principal) {
        String email = principal.getName();  // Get the email of the logged-in patient

        // Call the service to cancel the appointment
        appointmentService.cancelAppointment(appointmentDTO.getAppointmentId(), email);

        return ResponseEntity.ok("Appointment canceled successfully!");
    }
}
