package com.example.hostelcompilant.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.hostelcompilant.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

	List<User> findByStatusTrue();

	Optional<User> findByIdAndStatusTrue(Long id);

	User findByEmail(String email);

}

