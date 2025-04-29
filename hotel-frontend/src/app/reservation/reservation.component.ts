import { Component, OnInit } from '@angular/core';
import { RoomService } from '../services/room.service';
import { Reservation } from '../reservation'; // N'oublie pas d'importer ton interface !

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  reservations: Reservation[] = [];

  showModal = false;
  selectedReservation: Reservation = {
    id: 0,
    chambre: null!,
    client: null!,
    dateArrivee: '',
    dateDepart: '',
    nombrePersonnes: 1,
    typePaiement: '',
    montantTotal: 0
  };

  constructor(private roomService: RoomService) {}

  ngOnInit(): void {
    this.roomService.getReservationList().subscribe((data) => {
      this.reservations = data;
    });
  }

  openModal(reservation: Reservation) {
    this.selectedReservation = { ...reservation };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  updateReservation() {
    const partialReservation: Reservation = {
      id: this.selectedReservation.id,
      chambre: null!,
      client: null!,
      dateArrivee: this.selectedReservation.dateArrivee,
      dateDepart: this.selectedReservation.dateDepart,
      nombrePersonnes: 0,
      typePaiement: this.selectedReservation.typePaiement,
      montantTotal: 0
    };

    this.roomService.updateReservation(partialReservation).subscribe(() => {
      console.log('Réservation mise à jour avec succès');
      // Mettre à jour localement la liste si nécessaire
      const index = this.reservations.findIndex(r => r.id === partialReservation.id);
      if (index !== -1) {
        this.reservations[index].dateArrivee = partialReservation.dateArrivee;
        this.reservations[index].dateDepart = partialReservation.dateDepart;
        this.reservations[index].typePaiement = partialReservation.typePaiement;
      }
      this.closeModal();
    });
  }

  deleteReservation(id: number) {
    this.roomService.deleteReservation(id).subscribe(() => {
      this.reservations = this.reservations.filter(r => r.id !== id);
      console.log('Réservation supprimée');
    });
  }
}
