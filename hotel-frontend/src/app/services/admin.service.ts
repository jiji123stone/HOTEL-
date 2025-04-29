// src/app/services/admin.service.ts

import { Injectable } from '@angular/core';
import { Admin } from '../admin';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  // Liste des administrateurs
  private admins: Admin[] = [
    { nom: 'Jaweher', password: '123' },
    { nom: 'admin2', password: 'password456' },
    { nom: 'admin3', password: 'password789' },
  ];

  constructor() {}

  // Méthode pour rechercher un administrateur par son mot de passe
  rechercherParPassword(password: string): Admin | undefined {
    return this.admins.find(admin => admin.password === password);
  }
}
