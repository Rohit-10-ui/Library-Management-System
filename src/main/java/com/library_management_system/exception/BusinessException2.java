package com.library_management_system.exception;
public class BusinessException2 extends RuntimeException {

    private double penalty;

    public BusinessException2(String message, double penalty) {
        super(message);
        this.penalty = penalty;
    }

    public double getPenalty() {
        return penalty;
    }
}