package com.example.hostelcompilant.serviceImplementation;

import java.util.List;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.hostelcompilant.entity.User;
import com.example.hostelcompilant.repository.UserRepository;

@Service
public class CustomUserDetailsServiceImplementation implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsServiceImplementation(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        System.out.println("====================================");
        System.out.println("Loading UserDetails");
        System.out.println("Email : " + email);

        User user = userRepository.findByEmail(email);

        if (user == null) {
            System.out.println("User Not Found");
            throw new UsernameNotFoundException("User Not Found");
        }

        System.out.println("User Found : " + user.getName());
        System.out.println("Encoded Password : " + user.getPassword());

        System.out.println("Roles:");

        user.getRole().forEach(role ->
                System.out.println(role.getRoleName()));

        List<SimpleGrantedAuthority> authorities =
                user.getRole().stream()
                        .map(role -> new SimpleGrantedAuthority("ROLE_" + role.getRoleName()))
                        .toList();

        System.out.println("Authorities : " + authorities);
        System.out.println("====================================");

        return org.springframework.security.core.userdetails.User
                .withUsername(user.getEmail())
                .password(user.getPassword())
                .authorities(authorities)
                .build();
    }
}