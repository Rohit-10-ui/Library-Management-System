package com.library_management_system.service;

import com.library_management_system.dto.PaymentResponseDTO;

public interface PaymentService {

    PaymentResponseDTO createFinePayment(Long issueId);

    void confirmPayment(String sessionId);

}