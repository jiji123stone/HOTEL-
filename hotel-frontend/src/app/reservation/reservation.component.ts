import { Component, OnInit } from '@angular/core';
import { RoomService } from '../services/room.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  reservations: any[] = [];

  showModal = false;
  selectedReservation = {
    id: null,
    numero: '',
    capacite: 0,
    equipements: '',
    dateArrivee: '',
    dateDepart: '',
    tarif: 0,
    typePaiement: '',
    image: '',
    nombrePersonnes: 1,
    total: 0,
    type: '',
    reserved: 0
  };

  constructor(private roomService: RoomService) {}

  ngOnInit(): void {
    // S'abonner à l'Observable pour récupérer les réservations
    this.roomService.getReservationList().subscribe((data) => {
      this.reservations = data;  // Remplir la liste des réservations dès que les données sont récupérées
    });
  }

  openModal(reservation: any) {
    this.selectedReservation = { ...reservation };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  updateReservation() {
    const updatedReservation = { ...this.selectedReservation };
    const index = this.reservations.findIndex(r => r.id === updatedReservation.id);
    if (index !== -1) {
      this.reservations[index] = updatedReservation;
      this.roomService.updateReservation(updatedReservation).subscribe(() => {
        // Afficher un message de succès ou d'erreur après la mise à jour
        console.log('Réservation mise à jour avec succès');
      });
    }
    this.closeModal();
  }

  deleteReservation(id: number) {
    this.roomService.deleteReservation(id).subscribe(() => {
      // Supprimer la réservation après avoir reçu une confirmation du serveur
      this.reservations = this.reservations.filter(r => r.id !== id);
      console.log('Réservation supprimée');
    });
  }
}
