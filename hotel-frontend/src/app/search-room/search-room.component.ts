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
    this.rooms = this.roomService.getRooms();
  }

  checkAvailability() {
    const match = this.rooms.find(room =>
      room.capacite >= this.searchCapacity &&
      room.tarif <= this.searchPrice &&
      room.reserved === 0
    );

    this.searchResult = match ? 'Oui, existe' : 'Non';
  }
}
