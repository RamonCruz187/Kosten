package com.Kosten.Api_Rest.repository;

import com.Kosten.Api_Rest.model.Departure;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IDepartureRepository extends JpaRepository<Departure, Integer> {
}
