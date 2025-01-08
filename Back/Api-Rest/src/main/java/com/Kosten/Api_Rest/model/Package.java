package com.Kosten.Api_Rest.model;

import com.Kosten.Api_Rest.dto.packageDTO.PackageToUpdateDTO;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;


import java.text.DateFormatSymbols;
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
    private String duration;
    private String itinerary;
    private String physical_level;
    private String technical_level;
    private String included_services;
    private boolean active;
    private String locationInfo;
    private String historyInfo;
    private String activityInfo;

    /****************************************
     *  Relations with Month Names Entity
     ****************************************/
    @ElementCollection
    @CollectionTable(name = "package_months", joinColumns = @JoinColumn(name = "package_id"))
    @OrderColumn(name = "month_order")
    private List<MonthNames> months = new ArrayList<>();

    public void setMonths(List<Integer> monthIndices) {
        Locale localeMX = new Locale("es", "MX");
        DateFormatSymbols dfs = new DateFormatSymbols(localeMX);
        String[] monthNames = dfs.getMonths();
        String[] shortMonthNames = dfs.getShortMonths();

        this.months = new ArrayList<>();
        for (Integer index : monthIndices) {
            if (index >= 0 && index < 12) {
                this.months.add(new MonthNames(
                        capitalize(monthNames[index]),
                        capitalize(shortMonthNames[index])
                ));
            }
        }
    }

    private String capitalize(String str) {
        return str.substring(0, 1).toUpperCase() + str.substring(1);
    }
    /**********************************************************************************/

    /****************************************
     *  Relations with Category Entity
     ****************************************/

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id",referencedColumnName = "id", nullable = false)
    @JsonManagedReference(value = "category")
    private Category category;

    /********End of Relations with Category Entity********/


    /****************************************
     *  Relations with Image Entity
     ****************************************/
    @OneToMany( mappedBy = "packageRef", orphanRemoval = true )
    @JsonManagedReference(value = "packageRef")
    private List<Image> images = new ArrayList<>();

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "banner_photo_id", referencedColumnName = "id")
    private Image bannerPhoto;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "itinerary_photo_id", referencedColumnName = "id")
    private Image itineraryPhoto;

    @OneToMany(mappedBy = "packageDestinyRef", cascade = CascadeType.ALL)
    private List<Image> destinyPhotos;


    //Helper Methods: Keep Both Sides of the Association in SYNC
    public void addImage(Image image) {
        if (this.images == null) {
            this.images = new ArrayList<>();
        }
        this.images.add(image);
        image.setPackageRef(this);
    }

    public void deleteImage(Image image) {
        this.images.remove(image);
        image.setPackageRef(null);
    }

    public void addImageToBanner(Image image) {

        this.bannerPhoto = image;
        image.setPackageRef(this);
    }


    public void addImageToItinerary(Image image) {

        this.itineraryPhoto = image;
        image.setPackageRef(this);
    }

    public void addImageToDestiny(Image image) {
        if (this.destinyPhotos == null) {
            this.destinyPhotos = new ArrayList<>();
        }
        this.destinyPhotos.add(image);
        image.setPackageDestinyRef(this);
    }
    /********End of Relations with Image Entity********/

    /****************************************
     *  Relations with Departure Entity
     ****************************************/
    @OneToMany(mappedBy = "packageRef", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Departure> departures = new ArrayList<>();

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
    /*@OneToMany(mappedBy = "comments", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> comments;
    */

    @Override
    public String toString() {
        return "Package{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", punctuation=" + punctuation +
                ", duration='" + duration + '\'' +
                ", itinerary='" + itinerary + '\'' +
                ", physical_level='" + physical_level + '\'' +
                ", technical_level='" + technical_level + '\'' +
                ", included_services='" + included_services + '\'' +
                ", active=" + active +
                ", months=" + months +
                ", images=" + images +
                '}';
    }

    /****************End of Relations with Departure Entity********/

    /* Relations with others Entities */
    /*@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", referencedColumnName = "id")
    private Category category;

    @OneToMany(mappedBy = "comments", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> comments;
    */

    public Package update(PackageToUpdateDTO packageToUpdateDTO) {
        if (packageToUpdateDTO.name() != null)
            this.name = packageToUpdateDTO.name();

        if (packageToUpdateDTO.description() != null)
            this.description = packageToUpdateDTO.description();

        if (packageToUpdateDTO.punctuation() != 0)
            this.punctuation = packageToUpdateDTO.punctuation();

        if (packageToUpdateDTO.duration() != null)
            this.duration = packageToUpdateDTO.duration();

        if (packageToUpdateDTO.itinerary() != null)
            this.itinerary = packageToUpdateDTO.itinerary();

        if (packageToUpdateDTO.physical_level() != null)
            this.physical_level = packageToUpdateDTO.physical_level();

        if (packageToUpdateDTO.technical_level() != null)
            this.technical_level = packageToUpdateDTO.technical_level();

        if (packageToUpdateDTO.included_services() != null)
            this.included_services = packageToUpdateDTO.included_services();

        if (packageToUpdateDTO.active() != null)
            this.active = packageToUpdateDTO.active();

        if (packageToUpdateDTO.locationInfo() != null)
            this.locationInfo = packageToUpdateDTO.locationInfo();

        if (packageToUpdateDTO.historyInfo() != null)
            this.historyInfo = packageToUpdateDTO.historyInfo();

        if (packageToUpdateDTO.activityInfo() != null)
            this.activityInfo =packageToUpdateDTO.activityInfo();

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
