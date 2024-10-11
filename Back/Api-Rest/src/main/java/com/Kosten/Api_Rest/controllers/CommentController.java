package com.Kosten.Api_Rest.controllers;

import com.Kosten.Api_Rest.dto.CommentDto;
import com.Kosten.Api_Rest.exception.CommentNotFoundException;
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
    public ResponseEntity<CommentDto> createComment(@RequestBody CommentDto commentDto) {
        CommentDto saveComment = commentService.createComment(commentDto);
        return new ResponseEntity<>(saveComment, HttpStatus.CREATED);
    }

    @GetMapping("/search/{id}")
    public ResponseEntity<?> findCommentById(@PathVariable("id") Long id) {
        try {
            CommentDto commentDto = commentService.findCommentById(id);
            return ResponseEntity.ok(commentDto);
        } catch (CommentNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }

    @GetMapping("/list")
    public ResponseEntity<List<CommentDto>> listComment() {
        List<CommentDto> commentDtoList = commentService.commentlist();
        return ResponseEntity.ok(commentDtoList);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<CommentDto> updateComment(@PathVariable("id") Long id, @RequestBody CommentDto updateComment) {
        CommentDto commentDto = commentService.updateComment(id, updateComment);
        return ResponseEntity.ok(commentDto);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteComment(@PathVariable("id") Long id) {
        commentService.deleteComment(id);
        return ResponseEntity.ok("The Recipe was eliminated");
    }

}
