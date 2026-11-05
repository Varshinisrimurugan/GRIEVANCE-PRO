package com.example.hostelcompilant.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.example.hostelcompilant.serviceImplementation.CustomUserDetailsServiceImplementation;
import com.example.hostelcompilant.util.JwtFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    private final JwtFilter jwtFilter;
    private final CustomUserDetailsServiceImplementation userDetailsService;

    public SecurityConfig(
            JwtFilter jwtFilter,
            CustomUserDetailsServiceImplementation userDetailsService) {

        this.jwtFilter = jwtFilter;
        this.userDetailsService = userDetailsService;
    }

    // =========================================================
    // PASSWORD ENCODER
    // =========================================================

    @Bean
    public PasswordEncoder passwordEncoder() {

        return new BCryptPasswordEncoder();

    }

    // =========================================================
    // AUTHENTICATION PROVIDER
    // =========================================================

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {

        DaoAuthenticationProvider provider =
                new DaoAuthenticationProvider();

        provider.setUserDetailsService(userDetailsService);

        provider.setPasswordEncoder(passwordEncoder());

        return provider;

    }

    // =========================================================
    // AUTHENTICATION MANAGER
    // =========================================================

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration configuration)
            throws Exception {

        return configuration.getAuthenticationManager();

    }

    // =========================================================
    // SECURITY FILTER CHAIN
    // =========================================================

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http)
            throws Exception {

        http

            .csrf(csrf -> csrf.disable())

            .cors(cors -> {
            })

            .sessionManagement(session ->
                    session.sessionCreationPolicy(
                            SessionCreationPolicy.STATELESS))

            .authenticationProvider(authenticationProvider())

            .authorizeHttpRequests(auth -> auth

                // =====================================
                // OPTIONS
                // =====================================

                .requestMatchers(
                        HttpMethod.OPTIONS,
                        "/**")
                .permitAll()

                // =====================================
                // AUTH
                // =====================================

                .requestMatchers("/auth/**")
                .permitAll()

                // =====================================
                // USERS
                // =====================================

                .requestMatchers("/users/**")
                .permitAll()

                // =====================================
                // COMPLAINTS
                // =====================================

                .requestMatchers("/compilants/**")
                .permitAll()

                .requestMatchers("/raise-compilant")
                .permitAll()

                // =====================================
                // WORKERS
                // =====================================

                .requestMatchers("/worker/**")
                .permitAll()

                .requestMatchers("/workers/**")
                .permitAll()

                .requestMatchers("/worker-complaints/**")
                .permitAll()

                .requestMatchers("/assign-worker/**")
                .permitAll()

                // =====================================
                // DASHBOARD
                // =====================================

                .requestMatchers("/dashboard/**")
                .permitAll()

                // =====================================
                // CATEGORY
                // =====================================

                .requestMatchers("/categories/**")
                .permitAll()

                .requestMatchers("/priorities")
                .permitAll()

                // =====================================
                // NOTIFICATIONS
                // =====================================

                .requestMatchers("/notifications/**")
                .permitAll()

                // =====================================
                // REPORTS
                // =====================================

                .requestMatchers("/reports/**")
                .permitAll()

                // =====================================
                // FEEDBACK
                // =====================================

                .requestMatchers("/feedback/**")
                .permitAll()

                // =====================================
                // FILE UPLOADS
                // =====================================

                .requestMatchers("/uploads/**")
                .permitAll()

                .requestMatchers("/error")
                .permitAll()

                // =====================================
                // MAIL
                // =====================================

                .requestMatchers("/send-mail")
                .permitAll()

                // =====================================
                // SECURED APIs
                // =====================================

                .anyRequest().authenticated()

            )

            .addFilterBefore(
                    jwtFilter,
                    UsernamePasswordAuthenticationFilter.class);

        return http.build();

    }

}