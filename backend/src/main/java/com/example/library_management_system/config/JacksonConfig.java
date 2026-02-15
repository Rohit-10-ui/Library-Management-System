package com.example.library_management_system.config;

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
       System.out.println(new BCryptPasswordEncoder().encode("admin"));
       System.out.println(new BCryptPasswordEncoder().encode("admin1"));
        System.out.println(new BCryptPasswordEncoder().encode("demo123"));
          
       

       
        System.out.println(
new BCryptPasswordEncoder().matches("admin", "$2a$12$S/GJwPuW9ACBOkik91oxzuy5s3aTtxmENit0J0iXHFoGVRltkeX7K")
 );
 System.out.println(
new BCryptPasswordEncoder().matches("demo123", "$2a$10$Z0GazR9ZEUMa1AfhmWReye4POCLRJ9ZZ.183Go2gPbZSb5MT/As4")
 );
 





        return new BCryptPasswordEncoder();
    }
    
}
