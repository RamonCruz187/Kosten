package com.Kosten.Api_Rest.service.impl;

import com.Kosten.Api_Rest.dto.comment.CommentDto;
import com.Kosten.Api_Rest.Exception.commentExc.CommentNotFoundException;
import com.Kosten.Api_Rest.Exception.userExc.UserNotFoundException;
import com.Kosten.Api_Rest.dto.comment.CommentRequestDto;
import com.Kosten.Api_Rest.dto.comment.UpdateCommentDto;
import com.Kosten.Api_Rest.mapper.CommentMapper;
import com.Kosten.Api_Rest.model.Comment;
import com.Kosten.Api_Rest.model.ReportComment;
import com.Kosten.Api_Rest.model.User;
import com.Kosten.Api_Rest.repository.CommentRepository;
import com.Kosten.Api_Rest.repository.ReportCommentRepository;
import com.Kosten.Api_Rest.repository.UserRepository;
import com.Kosten.Api_Rest.service.CommentService;
import com.Kosten.Api_Rest.service.ReportCommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final CommentMapper commentMapper;
    private final UserRepository userRepository;
    private final ReportCommentRepository reportCommentRepository;

    @Override
    @Transactional
    public CommentDto createComment(CommentRequestDto commentRequestDto) {
        User user = userRepository.findById(commentRequestDto.userId())
                .orElseThrow(() -> new UserNotFoundException("Usuario no encontrado con ID: " + commentRequestDto.userId()));
        Comment comment = commentMapper.toEntity(commentRequestDto);
        comment.setUser(user);
        comment.setIsVisible(false);
        Comment commentSaved = commentRepository.save(comment);
        return commentMapper.toDto(commentSaved);
    }

    @Override
    @Transactional(readOnly = true)
    public CommentDto findCommentById(Long commentId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new CommentNotFoundException("Comentario no encontrado con ID: " + commentId));
        return commentMapper.toDto(comment);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CommentDto> commentlist() {
        List<Comment> commentList = (List<Comment>) commentRepository.findAll();
        return commentMapper.entityListToDtoList(commentList);
    }

    @Override
    @Transactional
    public CommentDto updateComment(Long commentId, UpdateCommentDto commentUpDate) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new CommentNotFoundException("Comentario no encontrado con ID: " + commentId));
        comment.setContent(commentUpDate.content());
        return commentMapper.toDto(commentRepository.save(comment));
    }

    @Override
    @Transactional
    public void deleteComment(Long commentId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new CommentNotFoundException("Comentario no encontrado con ID: " + commentId));
        commentRepository.delete(comment);
    }

    @Override
    @Transactional
    public CommentDto updateCommentVisibility(Long commentId, boolean visible) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new CommentNotFoundException("Comentario no encontrado con ID: " + commentId));
        comment.setIsVisible(visible);
        Comment commentSaved = commentRepository.save(comment);
        return commentMapper.toDto(commentSaved);
    }

    @Override
    @Transactional(readOnly = true)
    public int getReportCommentCount(Long commentId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new CommentNotFoundException("Comentario no encontrado con ID: " + commentId));
        List<ReportComment> reportCommentList = reportCommentRepository.findAllByCommentId(comment.getId());
        return reportCommentList.size();
    }


}
