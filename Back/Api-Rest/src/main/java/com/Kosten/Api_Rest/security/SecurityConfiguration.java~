package com.Kosten.Api_Rest.security;

import com.Kosten.Api_Rest.Jwt.JwtAuthenticationFilter;
import com.Kosten.Api_Rest.model.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(sessionManagement -> sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests( auth -> auth
                        .requestMatchers(HttpMethod.OPTIONS, "/**")
                            .permitAll()
                        .requestMatchers("/test")
                            .permitAll()
                        .requestMatchers("/user/**")
                            .permitAll()
                        .requestMatchers(HttpMethod.POST, "/packages")
                            .hasAnyAuthority(Role.ADMIN.name(), Role.USER.name())
                        .requestMatchers(HttpMethod.PUT, "/packages")
                            .hasAnyAuthority(Role.ADMIN.name(), Role.USER.name())
                        .requestMatchers(HttpMethod.GET, "/packages")
                            .hasAnyAuthority(Role.ADMIN.name(), Role.USER.name())
                        .requestMatchers("/test")
                            .permitAll()
                        .requestMatchers("/auth/**")
                            .permitAll()
                        .requestMatchers("/comment/**")
                            .permitAll()
                        .requestMatchers("/report-comment/**")
                            .permitAll()
                        .requestMatchers("/api-docs/**", "api-docs.yaml")
                            .permitAll()
                        .requestMatchers("/swagger-ui-custom.html", "/swagger-ui/**", "/swagger-ui/")
                            .permitAll()
                        .requestMatchers("/departures/**")
                            .permitAll()
                        .requestMatchers(HttpMethod.GET, "/images/all")
                            .permitAll()
                        .requestMatchers(HttpMethod.GET, "/staff/**")
                            .permitAll()
                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

}
