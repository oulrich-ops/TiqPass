package com.tiqkis.tiqpass.domain.purchasing;

import com.tiqkis.tiqpass.domain.model.Payer;
import com.tiqkis.tiqpass.domain.model.Ticketing;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.threeten.bp.LocalDateTime;

import java.util.List;

@Entity
@AllArgsConstructor @NoArgsConstructor
@Data
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "ticketing_id")
    private Ticketing ticketing;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Payer customer;

    private String stripeSessionId;

    private double totalAmount;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<OrderItem> items;

    private LocalDateTime createdAt;

    @Enumerated(EnumType.STRING)
    private OrderStatus status = OrderStatus.PENDING;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }




}
