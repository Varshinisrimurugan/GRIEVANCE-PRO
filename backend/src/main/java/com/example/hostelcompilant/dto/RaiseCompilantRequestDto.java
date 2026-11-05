package com.example.hostelcompilant.dto;

public class RaiseCompilantRequestDto {

	private String category;
	private String complaint_title;
	private String description;
	private String location;
	private String priority;
	private Long user_id;

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getComplaint_title() {
		return complaint_title;
	}

	public void setComplaint_title(String complaint_title) {
		this.complaint_title = complaint_title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getPriority() {
		return priority;
	}

	public void setPriority(String priority) {
		this.priority = priority;
	}

	public Long getUser_id() {
		return user_id;
	}

	public void setUser_id(Long user_id) {
		this.user_id = user_id;
	}
}