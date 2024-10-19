package com.Kosten.Api_Rest.repository;

import com.Kosten.Api_Rest.model.ReportComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReportCommentRepository extends JpaRepository<ReportComment, Long> {
    List<ReportComment> findAllByCommentId(Long CommentId);
}
