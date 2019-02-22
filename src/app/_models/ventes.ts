export class Vente {
  id: number;
  dateVente: string;
  employe: number;
  montantTotal: number;

  constructor() {
    this.dateVente = null;
    this.employe = null;
    this.montantTotal = 0;
  }

}
