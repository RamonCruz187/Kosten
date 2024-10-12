package com.Kosten.Api_Rest.service;

import com.Kosten.Api_Rest.dto.CommentDto;

import java.util.List;

public interface CommentService {

    CommentDto createComment(CommentDto commentDto);

    CommentDto findCommentById(Long id);

    List<CommentDto> commentlist();

    CommentDto updateComment(Long id, CommentDto commentUpDate);

    void deleteComment(Long id);

    CommentDto updateCommentVisibility(Long id, boolean visible);

}
