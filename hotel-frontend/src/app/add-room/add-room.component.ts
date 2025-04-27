import { Component } from '@angular/core';
import { RoomService } from '../services/room.service';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.css']
})
export class AddRoomComponent {
  showAddForm = false;

  selectedRoom = {
    numero: '',
    type: '',
    capacite: 0,
    equipements: '',
    tarif: 0,
    image: ''
  };

  constructor(private roomService: RoomService) {}

  toggleForm() {
    this.showAddForm = !this.showAddForm;
  }

  addRoom() {
    this.roomService.addRoom(this.selectedRoom);
    console.log('Chambre ajoutée :', this.selectedRoom);
    this.resetForm();
    this.toggleForm();
  }

  resetForm() {
    this.selectedRoom = {
      numero: '',
      type: '',
      capacite: 0,
      equipements: '',
      tarif: 0,
      image: ''
    };
  }
}
