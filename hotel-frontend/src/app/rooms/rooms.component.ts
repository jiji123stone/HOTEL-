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
    total: 0
  };

  constructor(private roomService: RoomService) {}

  ngOnInit(): void {
    this.rooms = this.roomService.getRooms();
    this.reservationList = this.roomService.getReservationList();
  }

  bookNow(room: any) {
    this.selectedRoom = room;
    this.showModal = true;

    this.reservationData = {
      dateArrivee: '',
      dateDepart: '',
      nombrePersonnes: 1,
      typePaiement: '',
      total: 0
    };
  }

  calculateTotal() {
    const date1 = new Date(this.reservationData.dateArrivee);
    const date2 = new Date(this.reservationData.dateDepart);
    const diffTime = date2.getTime() - date1.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    this.reservationData.total = diffDays > 0 ? diffDays * this.selectedRoom.tarif : 0;
  }

  confirmReservation() {
    const reservation = {
      ...this.selectedRoom,
      ...this.reservationData
    };
    this.roomService.addReservation(reservation);
    this.roomService.updateRoomStatus(this.selectedRoom.id, 1);
    this.closeModal();
  }

  closeModal() {
    this.showModal = false;
  }
}
