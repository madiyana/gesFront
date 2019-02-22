
export class Categories {
    id: number;
    nom: string;
    description: string;
    constructor() {
    }

    static verifyInput(categorie: Categories) {
        if (!categorie.nom) {
            return false;
        }
        return true;
    }
}
