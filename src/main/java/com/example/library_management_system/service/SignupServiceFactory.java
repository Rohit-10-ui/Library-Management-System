package com.example.library_management_system.service;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
@Service
public class SignupServiceFactory {

    private final Map<String, SignupService<?>> services;

    public SignupServiceFactory(List<SignupService<?>> serviceList) {
        this.services = serviceList.stream()
                .collect(Collectors.toMap(
                        s -> s.getClass().getAnnotation(Service.class).value(),
                        s -> s
                ));
    }

    public SignupService getService(String role) {
        return services.get(role);
    }
}
