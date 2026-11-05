package com.example.hostelcompilant.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;

@Entity
@Table(name = "worker")
public class Worker {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "worker_id")
    private Long id;

    @Column(name = "worker_name")
    private String workerName;

    private String specialization;

    @Column(name = "worker_status")
    private String workerStatus = "AVAILABLE";

    @Column(name = "active_complaints")
    private Integer activeComplaints = 0;

    // ONE WORKER -> ONE USER
    @OneToOne
    @JoinColumn(name = "user_id")
    @JsonIgnoreProperties({"password", "role", "student", "worker", "compilants"})
    private User user;

    // ONE WORKER -> MANY COMPLAINTS
    @OneToMany(mappedBy = "worker")
    @JsonIgnoreProperties({"worker"})
    private List<Compilant> compilants;

    public Worker() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getWorkerName() {
        return workerName;
    }

    public void setWorkerName(String workerName) {
        this.workerName = workerName;
    }

    public String getSpecialization() {
        return specialization;
    }

    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }

    public String getWorkerStatus() {
        return workerStatus;
    }

    public void setWorkerStatus(String workerStatus) {
        this.workerStatus = workerStatus;
    }

    public Integer getActiveComplaints() {
        return activeComplaints;
    }

    public void setActiveComplaints(Integer activeComplaints) {
        this.activeComplaints = activeComplaints;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<Compilant> getCompilants() {
        return compilants;
    }

    public void setCompilants(List<Compilant> compilants) {
        this.compilants = compilants;
    }
}