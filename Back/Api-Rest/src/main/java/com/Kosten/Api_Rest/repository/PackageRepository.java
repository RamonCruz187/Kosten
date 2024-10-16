package com.Kosten.Api_Rest.repository;

import com.Kosten.Api_Rest.model.Package;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PackageRepository extends JpaRepository<Package, Long> {

    Package findByIdAndActiveIsTrue(Long id);

    Page<Package> findAllByActiveIsTrue(Pageable pageable);

}
