import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoomService } from '../services/room.service';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.css']
})
export class AddRoomComponent {

  roomForm: FormGroup;

  constructor(private roomService: RoomService, private fb: FormBuilder) {
    this.roomForm = this.fb.group({
      numero: ['', Validators.required],
      type: ['', Validators.required],
      capacite: ['', [Validators.required]],
      equipements: ['', Validators.required], // sous forme de string (à splitter)
      tarif: [null, [Validators.required, Validators.min(1)]],
      urlImage: [''],
      star: [null, [Validators.required, Validators.min(1), Validators.max(5)]],
      reserved: [0] // valeur initiale
    });
  }

  addRoom() {
    if (this.roomForm.invalid) {
      this.roomForm.markAllAsTouched();
      return;
    }

    const formValue = this.roomForm.value;

    const equipementsArray = formValue.equipements
      .split(',')
      .map((equip: string) => equip.trim());

    const newRoom = {
      numero: formValue.numero,
      type: formValue.type,
      capacite: formValue.capacite,
      equipements: equipementsArray,
      tarif: formValue.tarif,
      urlImage: formValue.urlImage,
      star: formValue.star,
      reserved: formValue.reserved
    };

    console.log("Chambre à ajouter :", newRoom);

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
    this.roomForm.reset({
      reserved: 0
    });
  }
}

