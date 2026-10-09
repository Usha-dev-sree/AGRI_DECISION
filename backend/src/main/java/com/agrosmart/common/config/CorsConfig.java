package com.agrosmart.common.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Arrays;
import java.util.List;

/**
 * CORS configuration — exposes a CorsConfigurationSource bean so Spring Security
 * and Spring MVC share the same CORS rules.
 */
@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Value("${app.cors.allowed-origins}")
    private String allowedOriginsRaw;

    @Value("${app.cors.allowed-methods}")
    private String allowedMethodsRaw;

    @Value("${app.cors.allowed-headers}")
    private String allowedHeadersRaw;

    @Value("${app.cors.allow-credentials}")
    private boolean allowCredentials;

    /**
     * Used by Spring Security's .cors() configuration.
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();

        // Parse comma-separated values from application.yml
        List<String> origins = Arrays.asList(allowedOriginsRaw.split(","));
        List<String> methods = Arrays.asList(allowedMethodsRaw.split(","));

        config.setAllowedOriginPatterns(origins);
        config.setAllowedMethods(methods);
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(allowCredentials);
        config.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

    /**
     * Also apply CORS for Spring MVC (non-security) routes.
     */
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        List<String> origins = Arrays.asList(allowedOriginsRaw.split(","));
        List<String> methods = Arrays.asList(allowedMethodsRaw.split(","));

        registry.addMapping("/**")
                .allowedOriginPatterns(origins.toArray(new String[0]))
                .allowedMethods(methods.toArray(new String[0]))
                .allowedHeaders("*")
                .allowCredentials(allowCredentials);
    }
}
