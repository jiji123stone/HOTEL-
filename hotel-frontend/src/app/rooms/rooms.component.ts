import { Component, OnInit } from '@angular/core';
import { RoomService } from '../services/room.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
  rooms: any[] = [];
  reservationList: any[] = [];
  selectedRoom: any = null;
  showModal = false;

  reservationData = {
    dateArrivee: '',
    dateDepart: '',
    nombrePersonnes: 1,
    typePaiement: '',
    montantTotal: 0
  };

  constructor(private roomService: RoomService) {}

  ngOnInit(): void {
    this.loadRooms();
    this.loadReservations();
  }

  // Charger les chambres depuis l'API
  loadRooms() {
    this.roomService.getRooms().subscribe((data) => {
      this.rooms = data;
    });
  }

  // Charger les réservations depuis l'API
  loadReservations() {
    this.roomService.getReservationList().subscribe((data) => {
      this.reservationList = data;
    });
  }

  // Ouvrir la modal pour réserver une chambre
  bookNow(room: any) {
    this.selectedRoom = room;
    this.showModal = true;

    // Réinitialiser les données de réservation
    this.reservationData = {
      dateArrivee: '',
      dateDepart: '',
      nombrePersonnes: 1,
      typePaiement: '',
      montantTotal: 0
    };
  }

  // Calculer le montant total en fonction des dates de réservation
  calculateTotal() {
    const date1 = new Date(this.reservationData.dateArrivee);
    const date2 = new Date(this.reservationData.dateDepart);
    const diffTime = date2.getTime() - date1.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    this.reservationData.montantTotal = diffDays > 0 ? diffDays * this.selectedRoom.tarif : 0;
  }

  // Confirmer la réservation
  confirmReservation() {
    const reservation = {
      ...this.reservationData,
      chambre: { id: this.selectedRoom.id },  // ← juste l'id !!
      client: { id: 1 }
    };
    

    this.roomService.addReservation(reservation).subscribe(() => {
      this.roomService.updateRoomStatus(this.selectedRoom.id, 1).subscribe(() => {
        this.loadRooms(); // Recharger les chambres après la réservation
        this.closeModal();
      });
    });

    console.log("rrrrrrr",this.roomService.getReservationList())
  }

  // Fermer la modal
  closeModal() {
    this.showModal = false;
  }
}
