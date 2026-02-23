package com.library_management_system.exception;
public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String messageKey) {
        super(messageKey);
    }
}