package com.Kosten.Api_Rest.controllers;

import com.Kosten.Api_Rest.dto.CommentDto;
import com.Kosten.Api_Rest.dto.BaseResponse;
import com.Kosten.Api_Rest.dto.ExtendedBaseResponse;
import com.Kosten.Api_Rest.Exception.CommentNotFoundException;
import com.Kosten.Api_Rest.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comment")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @PostMapping("/save")
    public ResponseEntity<ExtendedBaseResponse<CommentDto>> createComment(@RequestBody CommentDto commentDto) {
        CommentDto savedComment = commentService.createComment(commentDto);
        BaseResponse response = BaseResponse.created("Comment created successfully.");
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ExtendedBaseResponse.of(response, savedComment));
    }

    @GetMapping("/search/{id}")
    public ResponseEntity<ExtendedBaseResponse<CommentDto>> findCommentById(@PathVariable("id") Long id) {
        try {
            CommentDto commentDto = commentService.findCommentById(id);
            BaseResponse response = BaseResponse.ok("Comment retrieved successfully.");
            return ResponseEntity.ok(ExtendedBaseResponse.of(response, commentDto));
        } catch (CommentNotFoundException ex) {
            BaseResponse response = new BaseResponse(true, HttpStatus.NOT_FOUND, ex.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ExtendedBaseResponse.of(response, null));
        }
    }

    @GetMapping("/list")
    public ResponseEntity<ExtendedBaseResponse<List<CommentDto>>> listComment() {
        List<CommentDto> commentDtoList = commentService.commentlist();
        BaseResponse response = BaseResponse.ok("Comments retrieved successfully.");
        return ResponseEntity.ok(ExtendedBaseResponse.of(response, commentDtoList));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ExtendedBaseResponse<CommentDto>> updateComment(@PathVariable("id") Long id, @RequestBody CommentDto updateComment) {
        CommentDto updatedComment = commentService.updateComment(id, updateComment);
        BaseResponse response = BaseResponse.ok("Comment updated successfully.");
        return ResponseEntity.ok(ExtendedBaseResponse.of(response, updatedComment));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ExtendedBaseResponse<String>> deleteComment(@PathVariable("id") Long id) {
        commentService.deleteComment(id);
        BaseResponse response = BaseResponse.ok("Comment deleted successfully.");
        return ResponseEntity.ok(ExtendedBaseResponse.of(response, "The Comment was eliminated."));
    }
}

