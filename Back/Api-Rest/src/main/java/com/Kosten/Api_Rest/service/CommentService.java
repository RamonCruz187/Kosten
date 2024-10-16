package com.Kosten.Api_Rest.service;

import com.Kosten.Api_Rest.dto.comment.CommentDto;
import com.Kosten.Api_Rest.dto.comment.CommentRequestDto;
import com.Kosten.Api_Rest.dto.comment.UpdateCommentDto;

import java.util.List;

public interface CommentService {

    CommentDto createComment(CommentRequestDto commentRequestDto);

    CommentDto findCommentById(Long commentId);

    List<CommentDto> commentlist();

    CommentDto updateComment(Long commentId, UpdateCommentDto commentUpDate);

    void deleteComment(Long commentId);

    CommentDto updateCommentVisibility(Long commentId, boolean visible);

//    CommentDto reportComment(Long commentId);

}
