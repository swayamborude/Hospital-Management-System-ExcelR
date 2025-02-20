package com.HMS.model;

import java.time.LocalDateTime;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DoctorDTO {
		private Long doctorId;
	 	private String degree;
	    private String qualification;
	    private LocalDateTime createdDate;
    // Optionally, add getter and setter methods if you're not using Lombok's @Data
    @Getter
    @Setter
    private UserDTO user; // Add UserDTO field
	    private Doctor.DoctorStatus status;

}
