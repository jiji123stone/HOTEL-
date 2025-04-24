import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private rooms = [
    {
      id: 1,
      numero: '101',
      type: 'Superior Room',
      capacite: 2,
      equipements: 'WiFi, TV, Minibar',
      tarif: 250,
      image: 'assets/images/room-1.png',
      reserved: 0
    },
    {
      id: 2,
      numero: '102',
      type: 'Deluxe Room',
      capacite: 3,
      equipements: 'WiFi, TV, AC',
      tarif: 300,
      image: 'assets/images/room-2.png',
      reserved: 0
    }
  ];

  private reservationList: any[] = [];

  constructor() {}

  getRooms() {
    return this.rooms;
  }

  getReservationList() {
    return this.reservationList;
  }

  addReservation(reservation: any) {
    this.reservationList.push(reservation);
  }

  updateRoomStatus(id: number, reserved: number) {
    const room = this.rooms.find(r => r.id === id);
    if (room) room.reserved = reserved;
  }
}
