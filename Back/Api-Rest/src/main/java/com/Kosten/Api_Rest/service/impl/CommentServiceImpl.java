package com.Kosten.Api_Rest.service.impl;

import com.Kosten.Api_Rest.Exception.commentExc.ResourceNotFoundException;
import com.Kosten.Api_Rest.Exception.packagesExc.PackageNotFoundException;
import com.Kosten.Api_Rest.dto.comment.*;
import com.Kosten.Api_Rest.Exception.commentExc.CommentNotFoundException;
import com.Kosten.Api_Rest.Exception.userExc.UserNotFoundException;
import com.Kosten.Api_Rest.mapper.CommentMapper;
import com.Kosten.Api_Rest.model.Comment;
import com.Kosten.Api_Rest.model.Package;
import com.Kosten.Api_Rest.model.ReportComment;
import com.Kosten.Api_Rest.model.User;
import com.Kosten.Api_Rest.repository.CommentRepository;
import com.Kosten.Api_Rest.repository.PackageRepository;
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
    private final PackageRepository packageRepository;

    @Override
    @Transactional
    public CommentDto createComment(CommentRequestDto commentRequestDto) {
        User user = userRepository.findById(commentRequestDto.userId())
                .orElseThrow(() -> new UserNotFoundException("Usuario no encontrado con ese ID: " + commentRequestDto.userId()));
        Package pack = packageRepository.findById(commentRequestDto.packageId())
                .orElseThrow(() -> new PackageNotFoundException("Paquete no encontrado con ese ID: " + commentRequestDto.packageId()));
        Comment comment = commentMapper.toEntity(commentRequestDto);
        comment.setPackageRef(pack);
        comment.setUser(user);
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
    public CommentDto updateCommentVisibility(UpdateVisibilityCommentDto updateVisibilityCommentDto) {
        Comment comment = commentRepository.findById(updateVisibilityCommentDto.commentId())
                .orElseThrow(() -> new CommentNotFoundException("Comentario no encontrado con ID: " + updateVisibilityCommentDto.commentId()));
        comment.setIsVisible(updateVisibilityCommentDto.isVisible());
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

    @Override
    @Transactional
    public CommentDto updateCommentFavorite(UpdateFavoriteCommentDto updateFavoriteCommentDto) {
        Comment comment = commentRepository.findById(updateFavoriteCommentDto.commentId())
                .orElseThrow(() -> new CommentNotFoundException("Comentario no encontrado con ID: " + updateFavoriteCommentDto.commentId()));
        comment.setIsFavorite(updateFavoriteCommentDto.isFavorite());
        Comment commentSaved = commentRepository.save(comment);
        return commentMapper.toDto(commentSaved);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CommentDtoResponse2> findVisibleAndFavoriteComments() {
        List<Comment> comments = commentRepository.findByIsVisibleTrueAndIsFavoriteTrue();
        return commentMapper.entityListToDtoList2(comments);
    }

    @Override
    @Transactional(readOnly = true)
    public CPackageResponse findCommentWithPackageById(Long commentId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new CommentNotFoundException("Comentario no encontrado con ese ID: " + commentId));
        return commentMapper.toCPackageResponse(comment);
    }

    @Override
    @Transactional(readOnly = true)
    public PackageCResponse findByPackageRef_Id(Long packageId) {
        List<Comment> list = commentRepository.findByPackageRef_IdAndIsVisibleTrue(packageId);
        if (list.isEmpty()) {
            throw new ResourceNotFoundException("No se encontraron comentarios para el paquete con ID: " + packageId);
        }
        return commentMapper.toPackageCResponse(list);
    }

}
