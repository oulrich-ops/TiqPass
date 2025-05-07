package com.tiqkis.tiqpass.purchasing.repository;

import com.tiqkis.tiqpass.domain.purchasing.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TicketRepository extends JpaRepository<Ticket,Long> {
}
