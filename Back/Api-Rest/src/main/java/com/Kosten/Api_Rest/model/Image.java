package com.Kosten.Api_Rest.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Objects;

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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "package_id", referencedColumnName = "id")
    private Package package_;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Image image = (Image) o;
        return Objects.equals(id, image.id) && Objects.equals(url, image.url) && Objects.equals(package_, image.package_);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, url, package_);
    }

    @Override
    public String toString() {
        return "Image{" +
                "id=" + id +
                ", url='" + url + '\'' +
                ", package_=" + package_ +
                '}';
    }
}
