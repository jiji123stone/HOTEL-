import { Component, OnInit } from '@angular/core';
import { RoomService } from '../services/room.service';

@Component({
  selector: 'app-rooms-admin',
  templateUrl: './rooms-admin.component.html',
  styleUrls: ['./rooms-admin.component.css']
})
export class RoomsAdminComponent implements OnInit {
  rooms: any[] = [];
  selectedRoom: any = null;
  showModal: boolean = false;

  constructor(private roomService: RoomService) {}

  ngOnInit(): void {
    this.loadRooms(); // Charger les chambres dès que le composant est initialisé
  }

  // Charger les chambres depuis le backend
  loadRooms() {
    this.roomService.getRooms().subscribe((data) => {
      this.rooms = data;
    });
  }

  // Ouvrir la modal pour éditer une chambre
  openModal(room: any) {
    this.selectedRoom = { ...room }; // Créer une copie de la chambre pour l'éditer
    this.showModal = true;
  }

  // Fermer la modal sans enregistrer les modifications
  closeModal() {
    this.showModal = false;
    this.selectedRoom = null;
  }

  // Mettre à jour une chambre
  updateRoom() {
    if (this.selectedRoom) {
      this.roomService.updateRoom(this.selectedRoom).subscribe(() => {
        this.loadRooms(); // Recharger la liste des chambres après mise à jour
        this.closeModal();
      });
    }
  }

  // Supprimer une chambre
  deleteRoom(id: number) {
    this.roomService.deleteRoom(id).subscribe(() => {
      this.loadRooms(); // Recharger les chambres après suppression
    });
  }
}
