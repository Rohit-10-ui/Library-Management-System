package com.library_management_system.service;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.library_management_system.dto.PaymentResponseDTO;
import com.library_management_system.entity.Issue;
import com.library_management_system.entity.IssueStatus;
import com.library_management_system.entity.Payment;
import com.library_management_system.repository.IssueRepository;
import com.library_management_system.repository.PaymentRepository;
import com.stripe.Stripe;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    private final IssueRepository issueRepo;
    private final PaymentRepository paymentRepo;

    @Value("${stripe.secret.key}")
    private String stripeKey;

    @Override
    public PaymentResponseDTO createFinePayment(Long issueId) {

        Issue issue = issueRepo.findById(issueId)
                .orElseThrow(() -> new RuntimeException("Issue not found"));

        double amount = issue.getPenalty();

        if (amount <= 0)
            throw new RuntimeException("No fine to pay");

        try {

            Stripe.apiKey = stripeKey;

            SessionCreateParams params =
                    SessionCreateParams.builder()
                            .setMode(SessionCreateParams.Mode.PAYMENT)
                            .setSuccessUrl("http://localhost:3000/payment-success?session_id={CHECKOUT_SESSION_ID}")
                            .setCancelUrl("http://localhost:3000/payment-failed")
                            .addLineItem(
                                    SessionCreateParams.LineItem.builder()
                                            .setQuantity(1L)
                                            .setPriceData(
                                                    SessionCreateParams.LineItem.PriceData.builder()
                                                            .setCurrency("inr")
                                                            .setUnitAmount((long)(amount * 100))
                                                            .setProductData(
                                                                    SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                                            .setName("Library Fine Payment")
                                                                            .build()
                                                            )
                                                            .build()
                                            )
                                            .build()
                            )
                            .build();

            Session session = Session.create(params);

            Payment payment = Payment.builder()
                    .issue(issue)
                    .amount(amount)
                    .currency("INR")
                    .sessionId(session.getId())
                    .paymentUrl(session.getUrl())
                    .status("PENDING")
                    .createdAt(LocalDateTime.now())
                    .build();

            paymentRepo.save(payment);

            return PaymentResponseDTO.builder()
                    .paymentId(payment.getId())
                    .issueId(issueId)
                    .amount(amount)
                    .paymentUrl(payment.getPaymentUrl())
                    .qrData(payment.getPaymentUrl())
                    .status(payment.getStatus())
                    .build();

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

   @Override
public void confirmPayment(String sessionId) {

    try {

        Stripe.apiKey = stripeKey;

        Session session = Session.retrieve(sessionId);

        if (!"paid".equals(session.getPaymentStatus())) {
            throw new RuntimeException("Payment not completed");
        }

        Payment payment = paymentRepo.findAll()
                .stream()
                .filter(p -> sessionId.equals(p.getSessionId()))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Payment not found"));

        // update payment
        payment.setStatus("PAID");
        paymentRepo.save(payment);

        // update issue
        Issue issue = payment.getIssue();

        issue.setStatus(IssueStatus.RETURNED);   // or "FINE_PAID"
        issue.setPenalty(0.0);

        issueRepo.save(issue);

    } catch (Exception e) {
        throw new RuntimeException(e);
    }
}
}