package com.library_management_system.exception;
public class BusinessException extends RuntimeException {
    public BusinessException(String messageKey) {
        super(messageKey);
    }
}