package com.example.hostelcompilant.dto;

public class CompilantRequestDto {

    private String category;
    private String issue_type;
    private String block_name;
    private String floor_number;
    private String room_number;
    private String compilant_title;

    // ADD THIS
    private String location;

    private String description;
    private String priority;
    private String photo_url;
    private String status;
    private Long user_id;

    public CompilantRequestDto() {
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getIssue_type() {
        return issue_type;
    }

    public void setIssue_type(String issue_type) {
        this.issue_type = issue_type;
    }

    public String getBlock_name() {
        return block_name;
    }

    public void setBlock_name(String block_name) {
        this.block_name = block_name;
    }

    public String getFloor_number() {
        return floor_number;
    }

    public void setFloor_number(String floor_number) {
        this.floor_number = floor_number;
    }

    public String getRoom_number() {
        return room_number;
    }

    public void setRoom_number(String room_number) {
        this.room_number = room_number;
    }

    public String getCompilant_title() {
        return compilant_title;
    }

    public void setCompilant_title(String compilant_title) {
        this.compilant_title = compilant_title;
    }

    // ADD THIS GETTER
    public String getLocation() {
        return location;
    }

    // ADD THIS SETTER
    public void setLocation(String location) {
        this.location = location;
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

    public String getPhoto_url() {
        return photo_url;
    }

    public void setPhoto_url(String photo_url) {
        this.photo_url = photo_url;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Long getUser_id() {
        return user_id;
    }

    public void setUser_id(Long user_id) {
        this.user_id = user_id;
    }
}