package com.Kosten.Api_Rest.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
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
    @JoinColumn(name = "package_id")
    @JsonBackReference
    private Package packageRef;
    public void setPackageRef(Package packageRef) {
        if (this.packageRef != null) {
            this.packageRef.getDepartures().remove(this);
        }
        this.packageRef = packageRef;
        if (packageRef != null) {
            packageRef.getDepartures().add(this);
        }
    }

/*
    @OneToMany
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private Set<User> usersList;*/

    private Double price;
    private LocalDateTime startDate;
    private LocalDateTime endDate;

    @Column(length = 45)
    private String meetingPlace;
    @Column(length = 45)
    private String finishPlace;
    private Boolean isActive;
    private int quota;

}
