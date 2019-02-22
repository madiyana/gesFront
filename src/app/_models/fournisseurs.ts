export class Fournisseurs {
    id: number;
    nom: string;
    telephone: string;
    email: string;
    adresse: string;

    constructor() {
    }

    static verifyInput(fournisseur: Fournisseurs) {
        if (!fournisseur.nom) {
            return false;
        }
        return true;
    }
}
