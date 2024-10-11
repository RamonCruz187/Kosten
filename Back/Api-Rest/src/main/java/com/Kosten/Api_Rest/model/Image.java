package com.Kosten.Api_Rest.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "images")
@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
@Builder
public class Image {

    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY )
    private Long id;

    private String url;

}
