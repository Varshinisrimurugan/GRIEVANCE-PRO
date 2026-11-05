package com.example.hostelcompilant.serviceImplementation;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.hostelcompilant.dto.UserrequestDto;
import com.example.hostelcompilant.dto.UserresponseDto;
import com.example.hostelcompilant.entity.Role;
import com.example.hostelcompilant.entity.Student;
import com.example.hostelcompilant.entity.User;
import com.example.hostelcompilant.entity.Worker;
import com.example.hostelcompilant.repository.RoleRepository;
import com.example.hostelcompilant.repository.StudentRepository;
import com.example.hostelcompilant.repository.UserRepository;
import com.example.hostelcompilant.repository.WorkerRepository;
import com.example.hostelcompilant.service.UserService;

@Service
public class UserServiceImplementation implements UserService {

	private final UserRepository userRepository;
	private final WorkerRepository workerRepository;
	private final StudentRepository studentRepository;
	private final RoleRepository roleRepository;
	private final PasswordEncoder passwordEncoder;

	public UserServiceImplementation(UserRepository userRepository, WorkerRepository workerRepository,
			StudentRepository studentRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder) {

		this.userRepository = userRepository;
		this.workerRepository = workerRepository;
		this.studentRepository = studentRepository;
		this.roleRepository = roleRepository;
		this.passwordEncoder =passwordEncoder;
	}

	@Override
	public void createUser(UserrequestDto userrequestDto) {
		User user = new User();

		user.setName(userrequestDto.getName());
		user.setEmail(userrequestDto.getEmail());
		user.setPassword(passwordEncoder.encode(userrequestDto.getPassword()));
		user.setPhoneNumber(userrequestDto.getPhoneNumber());
		user.setHostelBlock(userrequestDto.getHostelBlock());
		user.setStatus(true);

		userRepository.save(user);
		if (userrequestDto.getRole() != null) {
			List<Role> roleList = new ArrayList<>();
			for (String roleName : userrequestDto.getRole()) {

				Optional<Role> role = roleRepository.findByRoleName(roleName);

				if (role.isPresent()) {
					roleList.add(role.get());
				}
			}

			user.setRole(roleList);
		}
		userRepository.save(user);

		// Student
		if (userrequestDto.getStudent() != null) {

			Student student = new Student();

			student.setRegister_number(userrequestDto.getStudent().getRegister_number());

			student.setRoom_number(userrequestDto.getStudent().getRoom_number());

			student.setUser(user);

			studentRepository.save(student);
		}

		// Worker
		if (userrequestDto.getWorker() != null) {

			Worker worker = new Worker();

			worker.setWorkerName(userrequestDto.getWorker().getWorker_name());

			worker.setSpecialization(userrequestDto.getWorker().getSpecialization());

			worker.setUser(user);

			workerRepository.save(worker);
		}
	}

	@Override
	public List<UserresponseDto> getAllUsers() {

		List<User> users = userRepository.findByStatusTrue();

		List<UserresponseDto> dtos = new ArrayList<>();

		for (User user : users) {

			UserresponseDto dto = new UserresponseDto();

			dto.setName(user.getName());
			dto.setEmail(user.getEmail());
			dto.setPhoneNumber(user.getPhoneNumber());
			dto.setHostelBlock(user.getHostelBlock());

			dtos.add(dto);
		}

		return dtos;
	}

	@Override
	public void deleteUserbyId(Long id) {

		Optional<User> userOpt = userRepository.findByIdAndStatusTrue(id);

		if (userOpt.isPresent()) {

			User user = userOpt.get();

			user.setStatus(false);

			userRepository.save(user);
		}
	}

	@Override
	public void updateUser(Long id, UserrequestDto userrequestDto) {

		Optional<User> userOpt = userRepository.findByIdAndStatusTrue(id);

		if (userOpt.isPresent()) {

			User user = userOpt.get();

			user.setName(userrequestDto.getName());
			user.setEmail(userrequestDto.getEmail());
			user.setPhoneNumber(userrequestDto.getPhoneNumber());
			user.setHostelBlock(userrequestDto.getHostelBlock());

			userRepository.save(user);
		}
	}

	@Override
	public void patchUser(Long id, UserrequestDto userrequestDto) {

		Optional<User> userOpt = userRepository.findByIdAndStatusTrue(id);

		if (userOpt.isPresent()) {

			User user = userOpt.get();

			if (userrequestDto.getName() != null) {
				user.setName(userrequestDto.getName());
			}

			if (userrequestDto.getEmail() != null) {
				user.setEmail(userrequestDto.getEmail());
			}

			if (userrequestDto.getPhoneNumber() != null) {
				user.setPhoneNumber(userrequestDto.getPhoneNumber());
			}

			if (userrequestDto.getHostelBlock() != null) {
				user.setHostelBlock(userrequestDto.getHostelBlock());
			}

			userRepository.save(user);
		}
	}

	@Override
	public User findByEmail(String Email) {
		return userRepository.findByEmail(Email);
	}

}