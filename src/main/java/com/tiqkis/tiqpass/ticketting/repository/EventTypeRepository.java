package com.tiqkis.tiqpass.ticketting.repository;

import com.tiqkis.tiqpass.domain.model.EventType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventTypeRepository extends JpaRepository<EventType, Long> {
}