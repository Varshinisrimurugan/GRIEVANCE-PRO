package com.example.hostelcompilant.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.hostelcompilant.entity.AssignWorker;

@Repository
public interface AssignWorkerRepository extends JpaRepository<AssignWorker, Long> {

    List<AssignWorker> findByWorker_Id(Long workerId);
}