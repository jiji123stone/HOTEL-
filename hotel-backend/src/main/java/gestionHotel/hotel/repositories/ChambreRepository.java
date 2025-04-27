package gestionHotel.hotel.repositories;

import gestionHotel.hotel.entities.Chambre;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChambreRepository extends JpaRepository<Chambre, Long> {
}
