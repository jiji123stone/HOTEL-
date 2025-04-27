package gestionHotel.hotel.repositories;

import gestionHotel.hotel.entities.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
}
