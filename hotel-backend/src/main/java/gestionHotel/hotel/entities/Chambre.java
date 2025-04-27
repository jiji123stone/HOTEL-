package gestionHotel.hotel.entities;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Entity
@Data
public class Chambre {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String numero;
  private String type;
  private int capacite;

  @ElementCollection
  private List<String> equipements;

  private double tarif;
  private int star;
  private int reserved ;
  // Ajout de l'attribut urlImage pour stocker l'URL de l'image
  private String urlImage;
}
