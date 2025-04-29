import { Component, ElementRef, ViewChild } from '@angular/core';
import { ClientService } from '../services/client.service';
import { Client } from '../client';
import { AdminService } from '../services/admin.service';
import { Admin } from '../admin';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @ViewChild('container', { static: true }) container!: ElementRef;
  adminTrouve: Admin | undefined;

  password:string ='';
  name: string = '';
  email: string = '';
  prenom: string = '';
  tel:string= '' ; // même si ton entité ne gère pas encore password

  constructor(private clientService: ClientService , private adminService: AdminService , private router: Router) {}

  signUp() {
    const client: Client = {
      nom: this.name,
      prenom: this.prenom, // tu peux demander un champ "prenom" si besoin
      email: this.email ,
      telephone:parseInt(this.tel)
      // ajoute password si nécessaire dans ton modèle
    };

    this.clientService.saveClient(client).subscribe({
      next: (savedClient) => {
        console.log('Client enregistré avec succès:', savedClient);
        alert('Client enregistré avec succès!');
      },
      error: (error) => {
        console.error('Erreur lors de l\'enregistrement du client:', error);
        alert('Erreur lors de l\'enregistrement du client.');
      }
    });
  }
   

  email2: string = '';
  client?: Client;
  
  signIn() {
    if(this.email2.length>0){ 
    console.log("hhhhiii",this.email2)
    this.clientService.getClientByEmail(this.email2).subscribe({
      next: (data) => {
        this.client = data;
        console.log('Client trouvé:', this.client);
        alert('Bienvenue ' + this.client.nom);
        this.router.navigate(['/user/',`${this.client.id}`]); 
       
      },
      error: (err) => {
        console.error('Erreur lors de la recherche du client:', err);
        alert('Aucun client trouvé avec cet email.');
      }
      
    }); }

    else {

      this.adminTrouve = this.adminService.rechercherParPassword(this.password);
    if (this.adminTrouve) {
      alert('Admin trouvé : ' + this.adminTrouve.nom);

      this.router.navigate(['/admin']);
    } else {
      alert('Aucun admin trouvé avec ce mot de passe.');
    }

    }

  

  }




  signUpp() {
    this.container.nativeElement.classList.add('active');
    

  }

  signInn() {
    this.container.nativeElement.classList.remove('active');
  }

   
}
