package com.library_management_system.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.fasterxml.jackson.databind.ObjectMapper;

@Configuration
public class JacksonConfig {

    @Bean
    public ObjectMapper objectMapper() {
        return new ObjectMapper();
    }
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        System.out.println("####################################################\n#########################################################");
        System.out.println(
 new BCryptPasswordEncoder().matches("admin", "$2a$12$S/GJwPuW9ACBOkik91oxzuy5s3aTtxmENit0J0iXHFoGVRltkeX7K")
);
        return new BCryptPasswordEncoder();
    }
    
}
