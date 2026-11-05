package com.example.hostelcompilant.dto;

import java.util.List;

public class UserrequestDto {

	private String name;
	private String email;
	private String password;
	private String phoneNumber;
	private String hostelBlock;
	private WorkerrequestDto worker;
	private StudentrequestDto student;
	private List<String> role;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public String getHostelBlock() {
		return hostelBlock;
	}

	public void setHostelBlock(String hostelBlock) {
		this.hostelBlock = hostelBlock;
	}

	public WorkerrequestDto getWorker() {
		return worker;
	}

	public void setWorker(WorkerrequestDto worker) {
		this.worker = worker;
	}

	public StudentrequestDto getStudent() {
		return student;
	}

	public void setStudent(StudentrequestDto student) {
		this.student = student;
	}

	public List<String> getRole() {
		return role;
	}

	public void setRole(List<String> role) {
		this.role = role;
	}
}
