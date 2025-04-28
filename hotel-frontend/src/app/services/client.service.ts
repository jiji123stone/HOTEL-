import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../client'; // tu dois créer ce modèle aussi

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private apiUrl = 'http://localhost:8082/api/clients'; // adapte l'URL si besoin

  constructor(private http: HttpClient) { }

  // Récupérer tous les clients
  getAllClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.apiUrl);
  }

  // Ajouter un nouveau client
  saveClient(client: Client): Observable<Client> {
    return this.http.post<Client>(this.apiUrl, client);
  }

  // Supprimer un client par ID
  deleteClient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Récupérer un client par email
  getClientByEmail(email: string): Observable<Client> {
    return this.http.get<Client>(`${this.apiUrl}/email/${email}`);
  }
}
