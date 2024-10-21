package com.Kosten.Api_Rest.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "report_comments")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReportComment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "comment_id", nullable = false)
    private Comment comment;
    @Column(nullable = false)
    private String reason;
    @CreationTimestamp
    @Column(name = "dateCreation", nullable = false, updatable = false)
    private LocalDateTime dateCreation;
}
