package com.Kosten.Api_Rest.model;

import jakarta.persistence.*;
import lombok.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "staff")
public class Staff {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @Column(name = "last_name")
    private String lastName;
    private String rol;
    private int contact;

    @OneToOne
    @JoinColumn(name = "photo_id", referencedColumnName = "id")
    private Image photo;

}
