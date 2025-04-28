import { Component } from '@angular/core';
import { RoomService } from '../services/room.service';
import { Routes } from '@angular/router'
@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.css']
})
export class AddRoomComponent {

  selectedRoom = {
    numero: '',
    type: '',
    capacite: 0,
    equipements: '',  // Equipements sous forme de chaîne
    tarif: 0,
    urlImage: '',
    star: 0,
    reserved: 0
  };

  constructor(private roomService: RoomService) {}

  addRoom() {
    // Convertir 'equipements' (string) en tableau avant d'envoyer
    const equipementsArray = this.selectedRoom.equipements
      .split(',')
      .map((equip: string) => equip.trim());

    const newRoom = {
      numero: this.selectedRoom.numero,
      type: this.selectedRoom.type,
      capacite: this.selectedRoom.capacite,
      equipements: equipementsArray, // tableau ici
      tarif: this.selectedRoom.tarif,
      urlImage: this.selectedRoom.urlImage,
      star: this.selectedRoom.star,
      reserved: this.selectedRoom.reserved
    };

    console.log("Chambre à ajouter:", newRoom);

    this.roomService.addRoom(newRoom).subscribe(
      (response) => {
        console.log('Chambre ajoutée :', response);
        this.resetForm(); 
      },
      (error) => {
        console.error('Erreur lors de l\'ajout de la chambre :', error);
      }
    );
  }

  resetForm() {
    this.selectedRoom = {
      numero: '',
      type: '',
      capacite: 0,
      equipements: '',
      tarif: 0,
      urlImage: '',
      star: 0,
      reserved: 0
    };
  }
}
