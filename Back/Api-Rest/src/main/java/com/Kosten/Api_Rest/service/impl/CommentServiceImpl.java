package com.Kosten.Api_Rest.service.impl;

import com.Kosten.Api_Rest.dto.CommentDto;
import com.Kosten.Api_Rest.Exception.CommentNotFoundException;
import com.Kosten.Api_Rest.Exception.UserNotFoundException;
import com.Kosten.Api_Rest.mapper.CommentMapper;
import com.Kosten.Api_Rest.model.Comment;
import com.Kosten.Api_Rest.model.User;
import com.Kosten.Api_Rest.repository.CommentRepository;
import com.Kosten.Api_Rest.repository.UserRepository;
import com.Kosten.Api_Rest.service.CommentService;
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

    @Override
    @Transactional
    public CommentDto createComment(CommentDto commentDto) {
        User user = userRepository.findById(Math.toIntExact(commentDto.userId())).orElseThrow(() -> new UserNotFoundException("User not found with ID: " + commentDto.userId()));
        Comment comment = commentMapper.toEntity(commentDto);
        comment.setUser(user);
        comment.setIsVisible(false);
        Comment commentSaved = commentRepository.save(comment);
        return commentMapper.toDto(commentSaved);
    }

    @Override
    @Transactional(readOnly = true)
    public CommentDto findCommentById(Long id) {
        Comment comment = commentRepository.findById(Math.toIntExact(id)).orElseThrow(() -> new CommentNotFoundException("Comment not found with ID: " + id));
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
    public CommentDto updateComment(Long id, CommentDto commentUpDate) {
        Comment comment = commentRepository.findById(Math.toIntExact(id)).orElseThrow(() -> new CommentNotFoundException("Comment not found with ID: " + id));
        comment.setContent(commentUpDate.content());
        return commentMapper.toDto(commentRepository.save(comment));
    }

    @Override
    @Transactional
    public void deleteComment(Long id) {
        Comment comment = commentRepository.findById(Math.toIntExact(id)).orElseThrow(() -> new CommentNotFoundException("Comment not found with ID: " + id));
        commentRepository.delete(comment);
    }

    @Override
    @Transactional
    public CommentDto updateCommentVisibility(Long id, boolean visible) {
        Comment comment = commentRepository.findById(Math.toIntExact(id)).orElseThrow(() -> new CommentNotFoundException("Comment not found with ID: " + id));
        comment.setIsVisible(visible);
        Comment commentSaved = commentRepository.save(comment);
        return commentMapper.toDto(commentSaved);
    }
}
