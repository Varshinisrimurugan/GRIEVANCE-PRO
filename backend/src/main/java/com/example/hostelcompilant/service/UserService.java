package com.example.hostelcompilant.service;

import java.util.List;

import com.example.hostelcompilant.dto.UserrequestDto;
import com.example.hostelcompilant.dto.UserresponseDto;
import com.example.hostelcompilant.entity.User;

public interface UserService {
	void createUser(UserrequestDto userrequestDto);

	List<UserresponseDto> getAllUsers();

	void deleteUserbyId(Long id);

	void updateUser(Long id, UserrequestDto userrequestDto);

	void patchUser(Long id, UserrequestDto userRequestDto);

	User findByEmail(String Email);

}
