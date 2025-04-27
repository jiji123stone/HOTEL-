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
    equipements: '',  // Equipements sous forme de chaîne
    tarif: 0,
    urlImage: '',
    star: 0,
    reserved: 0
  };

  selectedRoom2 = {
    numero: '',
    type: '',
    capacite: 0,
    equipements: [] as string[],  // Equipements sous forme de tableau
    tarif: 0,
    urlImage: '',
    star: 0,
    reserved: 0
  };

  constructor(private roomService: RoomService) {}

  toggleForm() {
    this.showAddForm = !this.showAddForm;
  }

  addRoom() {
    // Convertir 'equipements' en tableau avant d'envoyer
    const equipementsArray = this.selectedRoom.equipements
      .split(',')   // Séparer la chaîne par des virgules
      .map((equip: string) => equip.trim()); // Supprimer les espaces inutiles

    // Remplacer la chaîne par le tableau dans 'selectedRoom2'
    this.selectedRoom2.numero = this.selectedRoom.numero;
    this.selectedRoom2.type = this.selectedRoom.type;
    this.selectedRoom2.capacite = this.selectedRoom.capacite;
    this.selectedRoom2.equipements = equipementsArray; // Assignation du tableau
    this.selectedRoom2.tarif=this.selectedRoom.tarif ;
    this.selectedRoom2.urlImage=this.selectedRoom.urlImage ;
    this.selectedRoom2.star=this.selectedRoom.star ;
    this.selectedRoom2.reserved=this.selectedRoom.reserved ;

    console.log("Chambre à ajouter:", this.selectedRoom2);  // Utiliser selectedRoom2 ici
    this.roomService.addRoom(this.selectedRoom2).subscribe(
      (response) => {
        console.log('Chambre ajoutée :', response);
        // Recharger les chambres après ajout
        this.resetForm(); 
        this.toggleForm();
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
      equipements: '',  // Réinitialisation en chaîne vide
      tarif: 0,
      urlImage: '',
      star: 0,
      reserved: 0
    };

    // Réinitialiser selectedRoom2 également
    this.selectedRoom2 = {
      numero: '',
      type: '',
      capacite: 0,
      equipements: [] as string[],  // Réinitialisation en tableau vide
      tarif: 0,
      urlImage: '',
      star: 0,
      reserved: 0
    };
  }
}
