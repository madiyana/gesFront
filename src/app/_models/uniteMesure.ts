export class UniteMesure {

    id: number;
    nom: string;
    codeUnite: string;
    actif: boolean;

    constructor() {
        this.nom = null;
        this.codeUnite = null;
        this.actif = true;
    }

    static verifyInput(uniteMesure: UniteMesure) {
      if (!uniteMesure.nom || !uniteMesure.codeUnite) {
          return false;
      }
      return true;
  }
}
