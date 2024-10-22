package com.Kosten.Api_Rest.service;

import com.Kosten.Api_Rest.dto.ReportComment.ReportCommentDto;
import com.Kosten.Api_Rest.dto.ReportComment.ReportCommentRequestDto;
import com.Kosten.Api_Rest.dto.ReportComment.UpdateReportCommentDto;
import com.Kosten.Api_Rest.model.ReportComment;

import java.util.List;

public interface ReportCommentService {

    ReportCommentDto addReportComment(ReportCommentRequestDto reportCommentRequestDto);

    ReportCommentDto findReportCommentById(Long reportCommentId);

    List<ReportCommentDto> reportCommentDtoList();

    ReportCommentDto updateReportComment(Long reportCommentId, UpdateReportCommentDto updateReportCommentDto);

    void deleteByReportCommentId(Long reportCommentId);

    List<ReportCommentDto> getReportComments(Long commentId);

}
