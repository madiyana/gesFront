
export class Rayon {
    id: number;
    nom: string;
    constructor() {
        this.nom = null;
    }

    static verifyInput(rayon: Rayon) {
        if (!rayon.nom) {
            return false;
        }
        return true;
    }
}
