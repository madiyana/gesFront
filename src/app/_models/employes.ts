export class Employes {
    id: number;
    nom: string;
    prenom: string;
    dateNaissance: string;
    telephone: string;
    adresse: string;
    email: string;
    profil: string;
    identifiant: string;
    motDePasse: string;
    premConnexion: boolean;
    actif: boolean;
    constructor() {
        this.premConnexion = true;
    }

    static verifyInput(employe: Employes) {
        if (!employe.nom || !employe.prenom || !employe.telephone || !employe.adresse
            || !employe.profil || !employe.dateNaissance) {
            return false;
        }
        return true;
    }
}
