package com.example.hostelcompilant.dto;

public class UserresponseDto {
	private String name;
	private String email;
	private String password;
	private String phoneNumber;
	private String hostelBlock;

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

	private WorkerrequestDto worker;
	private StudentrequestDto student;

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

}
