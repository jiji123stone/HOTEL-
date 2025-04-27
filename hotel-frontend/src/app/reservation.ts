export interface Reservation {
    id: number | null;
    numero: string;
    capacite: number;
    equipements: string;
    dateArrivee: string;
    dateDepart: string;
    tarif: number;
    image: string;
    nombrePersonnes: number;
    reserved: number;
    total: number;
    type: string;
    typePaiement: string;
  }
  