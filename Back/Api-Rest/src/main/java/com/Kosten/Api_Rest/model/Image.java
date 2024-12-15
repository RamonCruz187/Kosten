package com.Kosten.Api_Rest.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
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

    @Column(name = "public_id")
    private String publicId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "package_id", referencedColumnName = "id")
    @JsonBackReference(value = "packageRef")
    private Package packageRef;

    @OneToOne(mappedBy = "photo")
    private Staff staffRef;


    @ManyToOne
    @JoinColumn(name = "package_destiny_id")
    private Package packageDestinyRef;


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Image image = (Image) o;
        return Objects.equals(id, image.id) && Objects.equals(url, image.url) && Objects.equals(packageRef, image.packageRef);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, url, packageRef);
    }

    @Override
    public String toString() {
        return "Image{" +
                "id=" + id +
                ", url='" + url + '\'' +
                ", package=" + packageRef +
                '}';
    }
}
