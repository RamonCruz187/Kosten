package com.Kosten.Api_Rest.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "category")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference(value = "category")
    private List<Package> packages;

    //****** Helper Methods for Promotions: Keep Both Sides of the Association in SYNC.********/
    public void addPackage(Package package_) {
        this.packages.add(package_);
        package_.setCategory(this);
    }

    public void removePackage(Package package_) {
        package_.setCategory(null);
        this.packages.remove(package_);
    }
}
