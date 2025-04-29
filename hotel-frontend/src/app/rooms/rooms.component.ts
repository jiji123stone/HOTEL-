import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  clientId!: number;  // ici on stocke le client ID récupéré de l'URL

  reservationData = {
    dateArrivee: '',
    dateDepart: '',
    nombrePersonnes: 1,
    typePaiement: '',
    montantTotal: 0,
    client_id: 1, // valeur par défaut, sera écrasée après
  };

  constructor(
    private roomService: RoomService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Correction ici : récupérer directement depuis this.route.params
    this.route.params.subscribe(params => {
      this.clientId = +params['id']; // convertir en number
      console.log('Client ID récupéré:', this.clientId);
    });
  
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
    if (room.reserved === 1) {
      alert('Cette chambre est déjà réservée.');
      return;
    }
    this.selectedRoom = room;
    this.showModal = true;

    // Réinitialiser les données de réservation avec le bon client ID
    this.reservationData = {
      dateArrivee: '',
      dateDepart: '',
      nombrePersonnes: 1,
      typePaiement: '',
      montantTotal: 0,
      client_id: this.clientId  // très important
    };
  }

  // Calculer le montant total en fonction des dates de réservation
  calculateTotal() {
    const date1 = new Date(this.reservationData.dateArrivee);
    const date2 = new Date(this.reservationData.dateDepart);
    const diffTime = date2.getTime() - date1.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) {
      this.reservationData.montantTotal = 0;
      alert('Les dates de réservation ne sont pas valides.');
    } else {
      this.reservationData.montantTotal = diffDays * this.selectedRoom.tarif;
    }
  }

  // Confirmer la réservation
  confirmReservation() {
    if (this.reservationData.montantTotal <= 0) {
      alert('Veuillez vérifier les dates et le montant total.');
      return;
    }

    const reservation = {
      ...this.reservationData,
      chambre: { id: this.selectedRoom.id },
      client: { id: this.clientId }  // très important aussi
    };

    // Ajouter la réservation
    this.roomService.addReservation(reservation).subscribe(() => {
      this.selectedRoom.reserved = 1; // mettre à jour localement
      this.roomService.updateRoomStatus(this.selectedRoom.id, 1).subscribe(() => {
        this.loadRooms();  // recharger les chambres
        this.closeModal();
      });
    });
  }

  // Fermer la modal
  closeModal() {
    this.showModal = false;
  }
}
