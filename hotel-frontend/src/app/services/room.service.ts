import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reservation } from '../reservation';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private apiUrl = 'http://localhost:8082/api/chambres'; // URL de l'API pour les chambres
  private reservationUrl = 'http://localhost:8082/api/reservations'; // URL de l'API pour les réservations
   

  constructor(private http: HttpClient) {}

  // Récupérer toutes les chambres
  getRooms(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Récupérer la liste des réservations
  getReservationList(): Observable<any[]> {
    return this.http.get<any[]>(this.reservationUrl);
  }

  // Ajouter une réservation
  addReservation(reservation: any): Observable<any> {
    return this.http.post<any>(this.reservationUrl, reservation);
  }

  // Supprimer une réservation
  deleteReservation(id: number): Observable<any> {
    return this.http.delete<any>(`${this.reservationUrl}/${id}`);
  }

  updateReservation(reservation: Reservation): Observable<any> {
    const updateData = {
      dateArrivee: reservation.dateArrivee,
      dateDepart: reservation.dateDepart,
      typePaiement: reservation.typePaiement
    };
    return this.http.patch<any>(`${this.reservationUrl}/${reservation.id}`, updateData);
  }


  updateRoomStatus(roomId: number, reservedStatus: number) {
    return this.http.patch(`http://localhost:8082/api/chambres/${roomId}`, { reserved: reservedStatus });
  }
  

   // Supprimer une chambre
   deleteRoom(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
  // Mettre à jour une chambre
  updateRoom(room: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${room.id}`, room);
  }

  // room.service.ts

  addRoom(room: any): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(this.apiUrl, room, { headers });
  }
  

}













/*import { Injectable } from '@angular/core';
import { Reservation } from '../reservation';  // Assure-toi que tu importes l'interface Reservation

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

  private reservationList: Reservation[] = [
    {
      id: 1,
      numero: '101',
      capacite: 2,
      dateArrivee: '2025-04-18',
      dateDepart: '2025-04-30',
      equipements: 'WiFi, TV, Minibar',
      tarif: 250,
      image: 'assets/images/room-1.png',
      nombrePersonnes: 1,
      reserved: 0,
      total: 3000,
      type: 'Superior Room',
      typePaiement: 'espece'
    }
  ];

  constructor() {}

  getRooms() {
    return this.rooms;
  }

  getReservationList() {
    return this.reservationList;
  }

  addReservation(reservation: Reservation) {
    this.reservationList.push(reservation);
  }

  updateReservation(  updatedReservation: Reservation) {  // Mise à jour du type de paramètre
    const index = this.reservationList.findIndex(res => res.id === updatedReservation.id);
    if (index !== -1) {
      this.reservationList[index] = updatedReservation;
    }
  }

  deleteReservation(id: number) {
    this.reservationList = this.reservationList.filter(res => res.id !== id);
  }

  updateRoomStatus(id: number, reserved: number) {
    const room = this.rooms.find(r => r.id === id);
    if (room) room.reserved = reserved;
  }

  addRoom(room: any) {
    const newId = this.rooms.length > 0 ? Math.max(...this.rooms.map(r => r.id)) + 1 : 1;
    const newRoom = { ...room, id: newId, reserved: 0 };
    this.rooms.push(newRoom);
  }
}*/
