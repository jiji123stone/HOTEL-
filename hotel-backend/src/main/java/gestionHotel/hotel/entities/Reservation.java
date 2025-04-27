package gestionHotel.hotel.entities;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Data
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Chambre chambre;

    @ManyToOne
    private Client client;

    private LocalDate dateArrivee;
    private LocalDate dateDepart;
    private int nombrePersonnes;
    private String typePaiement;
    private double montantTotal;
}
