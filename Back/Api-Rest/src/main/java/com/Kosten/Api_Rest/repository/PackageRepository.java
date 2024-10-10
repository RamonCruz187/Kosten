package com.Kosten.Api_Rest.repository;

import com.Kosten.Api_Rest.model.Package;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PackageRepository extends JpaRepository<Package, Long> {
}
