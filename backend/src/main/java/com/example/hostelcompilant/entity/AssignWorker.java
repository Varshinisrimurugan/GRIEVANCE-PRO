package com.example.hostelcompilant.entity;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;

@Entity
@Table(name = "assign_worker")
public class AssignWorker {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // MANY ASSIGNMENTS -> ONE COMPLAINT
    @ManyToOne
    @JoinColumn(name = "compilant_id")
    @JsonIgnoreProperties({"user", "worker"})
    private Compilant compilant;

    // MANY ASSIGNMENTS -> ONE WORKER
    @ManyToOne
    @JoinColumn(name = "worker_id")
    @JsonIgnoreProperties({"user", "compilants"})
    private Worker worker;

    @Column(name = "assigned_at")
    private LocalDateTime assignedAt;

    public AssignWorker() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Compilant getCompilant() {
        return compilant;
    }

    public void setCompilant(Compilant compilant) {
        this.compilant = compilant;
    }

    public Worker getWorker() {
        return worker;
    }

    public void setWorker(Worker worker) {
        this.worker = worker;
    }

    public LocalDateTime getAssignedAt() {
        return assignedAt;
    }

    public void setAssignedAt(LocalDateTime assignedAt) {
        this.assignedAt = assignedAt;
    }
}