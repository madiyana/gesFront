import { Categories } from './categories';
import { UniteMesure } from './uniteMesure';
import { Rayon } from './rayons';

export class Articles {
    id: number;
    nom: string;
    reference: string;
    seuilCritique: number;
    tva: boolean;
    prixAchat: number;
    prixVenteHT: number;
    prixVenteTTC: number;
    marge: number;
    uniteMesure: UniteMesure;
    categorie: Categories;
    rayon: Rayon;


    constructor() {
    }


    static verifyInput(article: Articles) {
      if (!article.nom || !article.seuilCritique || !article.prixAchat || !article.uniteMesure
            || !article.categorie || !article.prixVenteHT || !article.nom) {
            return false;
        }
        return true;
    }
}
