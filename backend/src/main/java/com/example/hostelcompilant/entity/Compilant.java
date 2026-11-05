package com.example.hostelcompilant.entity;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;

@Entity
@Table(name = "compilant")
public class Compilant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // COMPILANT CODE
    @Column(name = "complaint_code", unique = true)
    private String compilantCode;

    private String category;

    @Column(name = "issue_type")
    private String issueType;

    @Column(name = "block_name")
    private String blockName;

    @Column(name = "floor_number")
    private String floorNumber;

    @Column(name = "room_number")
    private String roomNumber;

    @Column(name = "complaint_title")
    private String compilantTitle;

    private String location;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    private String description;

    private String priority;

    @Column(name = "photo_url")
    private String photoUrl;

    private String status;

    // MANY COMPILANTS -> ONE USER
    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnoreProperties({"compilants", "password", "role", "student", "worker"})
    private User user;

    // MANY COMPILANTS -> ONE WORKER
    @ManyToOne
    @JoinColumn(name = "worker_id")
    @JsonIgnoreProperties({"compilants"})
    private Worker worker;
   
    
    public Compilant() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCompilantCode() {
        return compilantCode;
    }

    public void setCompilantCode(String compilantCode) {
        this.compilantCode = compilantCode;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getIssueType() {
        return issueType;
    }

    public void setIssueType(String issueType) {
        this.issueType = issueType;
    }

    public String getBlockName() {
        return blockName;
    }

    public void setBlockName(String blockName) {
        this.blockName = blockName;
    }

    public String getFloorNumber() {
        return floorNumber;
    }

    public void setFloorNumber(String floorNumber) {
        this.floorNumber = floorNumber;
    }

    public String getRoomNumber() {
        return roomNumber;
    }

    public void setRoomNumber(String roomNumber) {
        this.roomNumber = roomNumber;
    }

    public String getCompilantTitle() {
        return compilantTitle;
    }

    public void setCompilantTitle(String compilantTitle) {
        this.compilantTitle = compilantTitle;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public String getPhotoUrl() {
        return photoUrl;
    }

    public void setPhotoUrl(String photoUrl) {
        this.photoUrl = photoUrl;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Worker getWorker() {
        return worker;
    }

    public void setWorker(Worker worker) {
        this.worker = worker;
    }
}