package com.library_management_system.dto;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PaymentResponseDTO {

    private Long paymentId;

    private Long issueId;

    private Double amount;

    private String paymentUrl;

    private String qrData;

    private String status;

}