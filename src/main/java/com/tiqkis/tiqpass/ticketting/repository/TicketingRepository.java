package com.tiqkis.tiqpass.ticketting.repository;

import com.tiqkis.tiqpass.domain.model.Ticketing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TicketingRepository extends JpaRepository<Ticketing, Long> {

    @Query("SELECT t FROM Ticketing t WHERE t.promoter.id = :userId")
    List<Ticketing> findByUserId(@Param("userId") Long userId);
}