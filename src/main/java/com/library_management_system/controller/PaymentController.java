package com.library_management_system.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.library_management_system.dto.PaymentResponseDTO;
import com.library_management_system.service.PaymentService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/payments")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class PaymentController {

    private final PaymentService paymentService;

    // create stripe payment session
   @PostMapping("/fine/{issueId}")
public ResponseEntity<PaymentResponseDTO> createFinePayment(@PathVariable Long issueId) {
    PaymentResponseDTO response = paymentService.createFinePayment(issueId);
    return ResponseEntity.ok(response);
}

@PostMapping("/confirm")
public ResponseEntity<Void> confirmPayment(@RequestParam String sessionId) {
    paymentService.confirmPayment(sessionId);
    return ResponseEntity.ok().build();
}
}