package com.tiqkis.tiqpass.domain.purchasing;

import com.tiqkis.tiqpass.domain.model.PriceCategory;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor @NoArgsConstructor
@Data
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    //@JoinColumn(name = "order_id")
    private Order order;

    @ManyToOne
    //@JoinColumn(name = "category_id")
    private PriceCategory category;

    private String categoryName;

    private int quantity;

    private double unitPrice;

    public double getTotalPrice() {
        return unitPrice * quantity;
    }

}
