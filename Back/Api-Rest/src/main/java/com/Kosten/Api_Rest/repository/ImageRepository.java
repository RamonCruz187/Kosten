package com.Kosten.Api_Rest.repository;

import com.Kosten.Api_Rest.model.Image;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<Image, Long> {
}
