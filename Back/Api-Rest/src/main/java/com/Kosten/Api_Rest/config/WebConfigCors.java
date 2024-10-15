package com.Kosten.Api_Rest.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Class to solve CORS problems
 * */

@Configuration
@EnableWebMvc
public class WebConfigCors implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
          .allowedOrigins("*") // Can be restricted to specific origins in a production environment
          .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
          .allowedHeaders("Authorization", "Content-Type")
          .exposedHeaders("Authorization") // If you are using a custom header
          .allowCredentials(false)
          .maxAge(3600); // Maximum time in cache for pre-flight response
    }
}
