package com.tiqkis.tiqpass.ticketting.repository;

import com.tiqkis.tiqpass.domain.model.Ticketing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TicketingRepository extends JpaRepository<Ticketing, Long> {
}