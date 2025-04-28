import { Component, OnInit } from '@angular/core';
import { RoomService } from '../services/room.service';  // ajuste le chemin selon ton projet

@Component({
  selector: 'app-rooms-admin',
  templateUrl: './rooms-admin.component.html',
  styleUrls: ['./rooms-admin.component.css']
})
export class RoomsAdminComponent implements OnInit {

  rooms: any[] = [];
  showModal: boolean = false;
  selectedRoom: any = {};

  constructor(private roomService: RoomService) {}

  ngOnInit(): void {
    this.loadRooms();
  }

  loadRooms() {
    this.roomService.getRooms().subscribe(
      (data) => {
        this.rooms = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des chambres', error);
      }
    );
  }

  openModal(room: any) {
    this.selectedRoom = { 
      ...room,
      equipementsString: room.equipements.join(', ')  // Ajoute une version string pour l'input
    };
    this.showModal = true;
  }
  

  closeModal() {
    this.showModal = false;
    this.selectedRoom = {};
  }

  updateRoom() {
    // Convertir equipementsString ("WiFi, TV") en tableau ["WiFi", "TV"]
    if (typeof this.selectedRoom.equipementsString === 'string') {
      this.selectedRoom.equipements = this.selectedRoom.equipementsString.split(',').map((e: string) => e.trim());
    }
    
    this.roomService.updateRoom(this.selectedRoom).subscribe(
      () => {
        this.loadRooms();
        this.closeModal();
      },
      (error) => {
        console.error('Erreur lors de la mise à jour de la chambre', error);
      }
    );
  }
  
  deleteRoom(id: number) {
    if (confirm('Es-tu sûr de vouloir supprimer cette chambre ?')) {
      this.roomService.deleteRoom(id).subscribe(
        () => {
          console.log('Chambre supprimée avec succès');
          this.loadRooms(); // Recharge la liste après suppression
        },
        (error) => {
          if (error.status === 404) {
            alert('Erreur : La chambre n\'existe pas (déjà supprimée ou ID invalide)');
          } else {
            alert('Erreur lors de la suppression de la chambre.');
          }
          console.error('Erreur lors de la suppression de la chambre', error);
        }
      );
    }
  }
  
}
