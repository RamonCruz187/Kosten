package com.Kosten.Api_Rest.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Objects;

@Entity
@Table(name = "packages")
@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
@Builder
public class Package {

    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY )
    private Long id;

    private String name;
    private String description;
    private int punctuation;
    private int duration;
    private boolean active;

    /* Relations with others Entities */
    /*@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", referencedColumnName = "id")
    private Category category;

    @OneToMany(mappedBy = "departure", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Departure> departures;

    @OneToMany(mappedBy = "comments", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> comments;

    @OneToMany(mappedBy = "image", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Image> images;

    @OneToMany(mappedBy = "months", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Month> months;
    */

    @Override
    public String toString() {
        return "Package{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", punctuation=" + punctuation +
                ", duration=" + duration +
                ", active=" + active +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Package aPackage = (Package) o;
        return punctuation == aPackage.punctuation && duration == aPackage.duration && active == aPackage.active && Objects.equals(id, aPackage.id) && Objects.equals(name, aPackage.name) && Objects.equals(description, aPackage.description);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, description, punctuation, duration, active);
    }
}
