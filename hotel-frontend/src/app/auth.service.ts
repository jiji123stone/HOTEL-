// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private estAdminConnecte = false;

  setAdmin(status: boolean): void {
    this.estAdminConnecte = status;
  }

  isAdmin(): boolean {
    return this.estAdminConnecte;
  }
}
