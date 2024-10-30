package com.Kosten.Api_Rest.service.impl;

import com.Kosten.Api_Rest.Exception.commentExc.CommentNotFoundException;
import com.Kosten.Api_Rest.Exception.reportCommentExc.ReportCommentNotFoundException;
import com.Kosten.Api_Rest.dto.ReportComment.ReportCommentDto;
import com.Kosten.Api_Rest.dto.ReportComment.ReportCommentRequestDto;
import com.Kosten.Api_Rest.dto.ReportComment.UpdateReportCommentDto;
import com.Kosten.Api_Rest.mapper.ReportCommentMapper;
import com.Kosten.Api_Rest.model.Comment;
import com.Kosten.Api_Rest.model.ReportComment;
import com.Kosten.Api_Rest.repository.CommentRepository;
import com.Kosten.Api_Rest.repository.ReportCommentRepository;
import com.Kosten.Api_Rest.service.ReportCommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
public class ReportCommentServiceImpl implements ReportCommentService {

    private final ReportCommentRepository reportCommentRepository;
    private final ReportCommentMapper reportCommentMapper;
    private final CommentRepository commentRepository;
    @Override
    @Transactional
    public ReportCommentDto addReportComment(ReportCommentRequestDto reportCommentRequestDto) {
        Comment comment = commentRepository.findById(reportCommentRequestDto.idComment())
                .orElseThrow(() -> new CommentNotFoundException("Comentario no encontrado con ID: " + reportCommentRequestDto.idComment()));
        ReportComment reportComment = reportCommentMapper.toEntity(reportCommentRequestDto);
        reportComment.setComment(comment);
        comment.getReportComments().add(reportComment);
        ReportComment reportCommentSaved = reportCommentRepository.save(reportComment);

        System.out.println("idComment: " + reportCommentMapper.toDto(reportCommentSaved));
        return reportCommentMapper.toDto(reportCommentSaved);
    }

    @Override
    @Transactional(readOnly = true)
    public ReportCommentDto findReportCommentById(Long reportCommentId) {
        ReportComment reportComment = reportCommentRepository.findById(reportCommentId)
                .orElseThrow(() -> new ReportCommentNotFoundException("El Reporte no se ah encontrado con ese ID: " + reportCommentId));
        return reportCommentMapper.toDto(reportComment);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ReportCommentDto> reportCommentDtoList() {
        List<ReportComment> reportCommentList = (List<ReportComment>) reportCommentRepository.findAll();
        return reportCommentMapper.entityListToDtoList(reportCommentList);
    }

    @Override
    @Transactional
    public ReportCommentDto updateReportComment(Long reportCommentId, UpdateReportCommentDto updateReportCommentDto) {
        ReportComment reportComment = reportCommentRepository.findById(reportCommentId)
                .orElseThrow(() -> new ReportCommentNotFoundException("El Reporte no se ah encontrado con ese ID: " + reportCommentId));
        reportComment.setReason(updateReportCommentDto.reason());
        return reportCommentMapper.toDto(reportComment);
    }

    @Override
    @Transactional
    public void deleteByReportCommentId(Long reportCommentId) {
        ReportComment reportComment = reportCommentRepository.findById(reportCommentId)
                .orElseThrow(() -> new ReportCommentNotFoundException("El Reporte no se ah encontrado con ese ID: " + reportCommentId));
        reportCommentRepository.delete(reportComment);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ReportCommentDto> getReportComments(Long commentId) {
        List<ReportComment> reportCommentList = (List<ReportComment>) reportCommentRepository.findAllByCommentId(commentId);
        return reportCommentMapper.entityListToDtoList(reportCommentList);
    }
}
