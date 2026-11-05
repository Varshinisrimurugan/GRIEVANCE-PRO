package com.example.hostelcompilant.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "student", uniqueConstraints = { @UniqueConstraint(columnNames = "register_number"),
		@UniqueConstraint(columnNames = "user_id") })
public class Student {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long student_id;

	@Column(nullable = false, unique = true)
	private String register_number;

	private String room_number;

	@OneToOne
	@JoinColumn(name = "user_id", unique = true)
	private User user;

	public Long getStudent_id() {
		return student_id;
	}

	public void setStudent_id(Long student_id) {
		this.student_id = student_id;
	}

	public String getRegister_number() {
		return register_number;
	}

	public void setRegister_number(String register_number) {
		this.register_number = register_number;
	}

	public String getRoom_number() {
		return room_number;
	}

	public void setRoom_number(String room_number) {
		this.room_number = room_number;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
}
