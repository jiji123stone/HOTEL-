import { Component, OnInit } from '@angular/core';
import { RoomService } from '../services/room.service';

@Component({
  selector: 'app-search-room',
  templateUrl: './search-room.component.html',
  styleUrls: ['./search-room.component.css']
})
export class SearchRoomComponent implements OnInit {
  rooms: any[] = [];
  searchCapacity: number = 0;
  searchPrice: number = 0;
  searchResult: string | null = null;

  constructor(private roomService: RoomService) {}

  ngOnInit(): void {
    // On s'abonne à l'Observable pour récupérer les chambres
    this.roomService.getRooms().subscribe((data) => {
      this.rooms = data; // On récupère les chambres dès que les données sont disponibles
    });
  }

  checkAvailability(): void {
    // Recherche d'une chambre qui correspond aux critères de recherche
    const match = this.rooms.find(room =>
      room.capacite >= this.searchCapacity &&
      room.tarif <= this.searchPrice &&
      room.reserved === 0
    );

    // Affiche le résultat
    this.searchResult = match ? 'Oui, existe' : 'Non';
  }
}
