package com.tiqkis.tiqpass.ticketting.repository;


import com.tiqkis.tiqpass.domain.model.PriceCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PriceCategoryRepository extends JpaRepository<PriceCategory, Long> {
    // Additional custom queries can be added here if needed
}