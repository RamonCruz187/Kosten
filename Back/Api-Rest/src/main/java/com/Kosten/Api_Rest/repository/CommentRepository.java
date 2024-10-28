package com.Kosten.Api_Rest.repository;

import com.Kosten.Api_Rest.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByIsVisibleTrueAndIsFavoriteTrue();
}
