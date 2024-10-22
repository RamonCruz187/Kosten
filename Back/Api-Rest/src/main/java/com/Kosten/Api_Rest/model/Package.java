package com.Kosten.Api_Rest.model;

import com.Kosten.Api_Rest.dto.packageDTO.PackageToUpdateDTO;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.*;

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

    /****************************************
     *  Relations with Image Entity
     ****************************************/
    @OneToMany( mappedBy = "packageRef", orphanRemoval = true )
    @JsonManagedReference(value = "packageRef")
    private List<Image> images = new ArrayList<>();

    //Helper Methods: Keep Both Sides of the Association in SYNC
    public void addImage(Image image) {
        this.images.add(image);
        image.setPackageRef(this);
    }

    public void deleteImage(Image image) {
        this.images.remove(image);
        image.setPackageRef(null);
    }
    /********End of Relations with Image Entity********/

    /****************************************
     *  Relations with Departure Entity
     ****************************************/
    @OneToMany(mappedBy = "packageRef", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private Set<Departure> departures = new HashSet<>();

    //Helper Methods: Keep Both Sides of the Association in SYNC
    public void addDeparture(Departure departure) {
        this.departures.add(departure);
        departure.setPackageRef(this);
    }

    public void deleteDeparture(Departure departure) {
        this.departures.remove(departure);
        departure.setPackageRef(null);
    }
    public void clearDepartures() {
        departures.forEach(departure -> departure.setPackageRef(null));
        departures.clear();
    }

    /****************End of Relations with Departure Entity********/

    /* Relations with others Entities */
    /*@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", referencedColumnName = "id")
    private Category category;

    @OneToMany(mappedBy = "comments", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> comments;

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

    public Package update(PackageToUpdateDTO packageToUpdateDTO) {
        if (packageToUpdateDTO.name() != null)
            this.name = packageToUpdateDTO.name();

        if (packageToUpdateDTO.description() != null)
            this.description = packageToUpdateDTO.description();

        if (packageToUpdateDTO.punctuation() != 0)
            this.punctuation = packageToUpdateDTO.punctuation();

        if (packageToUpdateDTO.duration() != 0)
            this.duration = packageToUpdateDTO.duration();

        return this;
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

    public void delete() {
        this.active = false;
    }
}
