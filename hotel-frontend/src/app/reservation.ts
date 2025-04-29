export interface Reservation {
  id: number;
  chambre: {
    id: number;
    numero: string;
    type: string;
    capacite: number;
    equipements: string;
    tarif: number;
  };
  client: {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    telephone: string;
  };
  dateArrivee: string; // Utilisez string ou LocalDate selon votre préférence (ISO 8601 format, par exemple : "2025-04-15")
  dateDepart: string;
  nombrePersonnes: number;
  typePaiement: string;
  montantTotal: number;
}
