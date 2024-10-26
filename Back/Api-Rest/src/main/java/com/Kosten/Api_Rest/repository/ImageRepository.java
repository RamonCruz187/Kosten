package com.Kosten.Api_Rest.repository;

import com.Kosten.Api_Rest.model.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ImageRepository extends JpaRepository<Image, Long> {

    @Query("SELECT i FROM Image i WHERE i.packageRef IS NOT NULL")
    List<Image> findImagesWithPackage();
}
