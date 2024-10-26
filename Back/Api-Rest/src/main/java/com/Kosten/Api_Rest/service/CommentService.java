package com.Kosten.Api_Rest.service;

import com.Kosten.Api_Rest.dto.comment.*;

import java.util.List;

public interface CommentService {

    CommentDto createComment(CommentRequestDto commentRequestDto);

    CommentDto findCommentById(Long commentId);

    List<CommentDto> commentlist();

    CommentDto updateComment(Long commentId, UpdateCommentDto commentUpDate);

    void deleteComment(Long commentId);

    CommentDto updateCommentVisibility(UpdateVisibilityCommentDto updateVisibilityCommentDto);

    int getReportCommentCount(Long commentId);

    CommentDto updateCommentFavorite(UpdateFavoriteCommentDto updateFavoriteCommentDto);

    List<CommentDto> findVisibleAndFavoriteComments();

    CPackageResponse findCommentWithPackageById(Long commentId);

}
