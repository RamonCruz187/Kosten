package com.Kosten.Api_Rest.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@ToString
public class Departure {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Integer id;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "package_id", referencedColumnName = "id", nullable = false)
    private Package packageRef;


    @OneToMany
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private Set<User> usersList;

    private Double price;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    @Column(length = 20)
    private String startTime;
    @Column(length = 20)
    private String endTime;
    @Column(length = 45)
    private String meetingPlace;
    @Column(length = 45)
    private String finishPlace;

}
