package com.Kosten.Api_Rest.dto.ReportComment;

import jakarta.validation.constraints.NotBlank;

import java.io.Serializable;

public record UpdateReportCommentDto(
        @NotBlank(message = "El reporte no puede estar en blanco")
        String reason
) implements Serializable {
}
