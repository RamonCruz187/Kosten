package com.Kosten.Api_Rest.repository;

import com.Kosten.Api_Rest.model.Departure;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IDepartureRepository extends JpaRepository<Departure, Integer> {
    @Query("SELECT DISTINCT d FROM Departure d LEFT JOIN FETCH d.usersList")
    List<Departure> findAllWithUsers();
}
