package com.HMS.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.HMS.model.Doctor;
import com.HMS.model.DoctorDTO;
import com.HMS.model.Role;
import com.HMS.model.RoleType;
import com.HMS.model.User;
import com.HMS.model.UserDTO;
import com.HMS.repository.DoctorRepo;
import com.HMS.repository.RoleRepo;
import com.HMS.repository.UserRepo;

import jakarta.transaction.Transactional;

@Service
public class DoctorService {
	@Autowired
	private UserRepo userRepo;

	@Autowired
	private DoctorRepo doctorRepo;

	@Autowired
	private RoleRepo roleRepo;

	@Autowired
	private AppointmentService appointmentService;

	/**
     * Helper method to map a User and Doctor to DoctorDTO.
     */
    private DoctorDTO mapUserToDoctorDTO(User user) {
    	Optional<Doctor> optionalDoctor = doctorRepo.findByUser(user);
        DoctorDTO doctorDTO = new DoctorDTO();

        // Map User details
        UserDTO userDTO = new UserDTO(
            user.getUid(),
            user.getFirstName(),
            user.getLastName(),
            user.getPassword(),
            user.getCPassword(),
            user.getEmail(),
            user.getMobileNumber(),
            user.getAadharNumber(),
            user.getGender(),
            user.getDateOfBirth(),
            user.getCity(),
            user.getState(),
            user.getAddress(),
            user.getCreatedDate(),
            user.getRoles()
        );
        doctorDTO.setUser(userDTO); // Set userDTO to doctorDTO

        // Set Doctor details if available
        if (optionalDoctor.isPresent()) {
            Doctor doctor = optionalDoctor.get(); // Get the Doctor if present
            doctorDTO.setDoctorId(doctor.getDoctorId());
            doctorDTO.setDegree(doctor.getDegree());
            doctorDTO.setQualification(doctor.getQualification());
            doctorDTO.setCreatedDate(doctor.getCreatedDate());
        } else {
            System.out.println("Doctor not found for user: " + user.getFirstName());
        }

        return doctorDTO;
    }

    /**
     * Get all doctors with associated user details.
     */
    public List<DoctorDTO> getAllDoctors() {
        List<User> users = userRepo.findByRoles_Name(RoleType.DOCTOR); // Fetch users with DOCTOR role

        if (users.isEmpty()) {
            System.out.println("No doctors found.");
        }

        // Use the helper method to map each User to DoctorDTO
        return users.stream()
                    .map(this::mapUserToDoctorDTO) // Call the helper method
                    .collect(Collectors.toList());
    }

    // Method to assign the doctor role and save doctor data
    /**
     * Assign the doctor role and save doctor data for an existing patient.
     */
    @Transactional
    public Doctor assignDoctorRoleToPatient(Long userId, DoctorDTO doctorDTO) {
        Optional<User> userOptional = userRepo.findById(userId);
        if (!userOptional.isPresent()) {
            throw new RuntimeException("User not found with ID: " + userId);
        }

        User user = userOptional.get();

        // Check if the user has the PATIENT role
        Role patientRole = roleRepo.findByName(RoleType.PATIENT)
            .orElseThrow(() -> new RuntimeException("PATIENT role not found in the database"));

        if (!user.getRoles().contains(patientRole)) {
            throw new RuntimeException("User with ID " + userId + " is not a patient.");
        }

        // Add the DOCTOR role if not already present
        Role doctorRole = roleRepo.findByName(RoleType.DOCTOR)
            .orElseThrow(() -> new RuntimeException("DOCTOR role not found in the database"));

        if (!user.getRoles().contains(doctorRole)) {
            user.getRoles().add(doctorRole); // Add the DOCTOR role to the user
            userRepo.save(user); // Save updated user with new role
        }

        // Create or update Doctor entity associated with this user
        Optional<Doctor> existingDoctor = doctorRepo.findByUser(user); // Fetch associated Doctor
        Doctor doctor;
        if (existingDoctor.isPresent()) {
            doctor = existingDoctor.get(); // If exists, get it
        } else {
            doctor = new Doctor(); // If not exists, create new
        }

        doctor.setUser(user); // Associate the doctor with the user
        doctor.setDegree(doctorDTO.getDegree());
        doctor.setQualification(doctorDTO.getQualification());

        // Log the user and doctor details
        System.out.println("Assigning doctor role to user: " + user.getFirstName());

        return doctorRepo.save(doctor); // Save doctor details
    }

	public User getAuthenticatedDoctor(String email) {
		// TODO Auto-generated method stub
		Optional<User> userOptional = userRepo.findByEmail(email);
		if (userOptional.isPresent()) {
			User user = userOptional.get();
			if (user.getRoles().stream().anyMatch(role -> role.getName() == RoleType.DOCTOR)) {
				return user;
			}
		}
		return null;
	}


	 // Method to update Doctor's status
	public String updateDoctorStatus(Long doctorId, Doctor.DoctorStatus status) {
	    Doctor doctor = doctorRepo.findById(doctorId)
	            .orElseThrow(() -> new RuntimeException("Doctor not found"));

	    doctor.setStatus(status);
	    doctorRepo.save(doctor);

	    // Cancel appointments if the doctor is set to INACTIVE
	    if (status == Doctor.DoctorStatus.INACTIVE) {
	    	 appointmentService.cancelAppointmentsByDoctor(doctor);

	    }
	    return "Appointments canceled for Doctor ID: " + doctorId;
	}

}
