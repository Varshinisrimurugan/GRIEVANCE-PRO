package com.example.hostelcompilant.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.hostelcompilant.entity.Student;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

}
