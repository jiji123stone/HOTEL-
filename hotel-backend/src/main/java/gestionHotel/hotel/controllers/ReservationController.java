package gestionHotel.hotel.controllers;

import gestionHotel.hotel.entities.Reservation;
import gestionHotel.hotel.repositories.ReservationRepository;
import gestionHotel.hotel.services.ReservationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/reservations")
public class ReservationController {

  private final ReservationService reservationService;
  private final ReservationRepository reservationRepository ;

  public ReservationController(ReservationService reservationService, ReservationRepository reservationRepository) {
    this.reservationService = reservationService;
    this.reservationRepository = reservationRepository;
  }

  @GetMapping
  public List<Reservation> getAllReservations() {
    return reservationService.findAll();
  }

  @PostMapping
  public Reservation saveReservation(@RequestBody Reservation reservation) {
    return reservationService.save(reservation);
  }

  @DeleteMapping("/{id}")
  public void deleteReservation(@PathVariable Long id) {
    reservationService.deleteById(id);
  }

  @PatchMapping("/{id}") // corrigé ici !
  public ResponseEntity<Reservation> updateReservationPartial(@PathVariable Long id, @RequestBody Reservation updatedFields) {
    Optional<Reservation> optionalReservation = reservationRepository.findById(id);

    if (optionalReservation.isEmpty()) {
      return ResponseEntity.notFound().build();
    }

    Reservation existingReservation = optionalReservation.get();

    if (updatedFields.getDateArrivee() != null) {
      existingReservation.setDateArrivee(updatedFields.getDateArrivee());
    }
    if (updatedFields.getDateDepart() != null) {
      existingReservation.setDateDepart(updatedFields.getDateDepart());
    }
    if (updatedFields.getTypePaiement() != null) {
      existingReservation.setTypePaiement(updatedFields.getTypePaiement());
    }
    if (updatedFields.getNombrePersonnes() != 0) {
      existingReservation.setNombrePersonnes(updatedFields.getNombrePersonnes());
    }
    if (updatedFields.getMontantTotal() != 0.0) {
      existingReservation.setMontantTotal(updatedFields.getMontantTotal());
    }

    Reservation updatedReservation = reservationService.save(existingReservation);
    return ResponseEntity.ok(updatedReservation);
  }
}
