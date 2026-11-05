package com.example.hostelcompilant.util;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private org.springframework.security.core.userdetails.UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        String path = request.getServletPath();

        // ================= PUBLIC APIs BYPASS =================
     // ================= PUBLIC APIs BYPASS =================
        if (path.startsWith("/auth")
                || path.startsWith("/users")
                || path.startsWith("/compilants")
                || path.startsWith("/raise-compilant")

                // Worker
                || path.startsWith("/worker")
                || path.startsWith("/workers")
                || path.startsWith("/worker-complaints")
                || path.startsWith("/assign-worker")

                // Dashboard
                || path.startsWith("/dashboard")

                // Category
                || path.startsWith("/categories")
                || path.startsWith("/priorities")

                // Notification
                || path.startsWith("/notifications")

                // Reports
                || path.startsWith("/reports")

                // Feedback
                || path.startsWith("/feedback")

                // Admin
                || path.startsWith("/admin")

                // Uploads
                || path.startsWith("/uploads")

                // Mail
                || path.startsWith("/send-mail")

                // Error
                || path.startsWith("/error")) {

            filterChain.doFilter(request, response);
            return;
        }

        String header = request.getHeader("Authorization");

        String token = null;
        String email = null;

        if (header != null && header.startsWith("Bearer ")) {
            token = header.substring(7);
            email = jwtUtil.extractEmail(token);
        }

        if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = userDetailsService.loadUserByUsername(email);

            if (jwtUtil.isTokenValid(token)) {
                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null,
                                userDetails.getAuthorities());

                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        filterChain.doFilter(request, response);
    }
}