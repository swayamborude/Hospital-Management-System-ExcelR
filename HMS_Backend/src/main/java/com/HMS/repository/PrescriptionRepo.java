package com.HMS.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.HMS.model.Prescription;
import com.HMS.model.Doctor;
import com.HMS.model.User;

@Repository
public interface PrescriptionRepo extends JpaRepository<Prescription, Long> {
    List<Prescription> findByDoctor(Doctor doctor);
    public List<Prescription> findByPatient(User patient);

}
