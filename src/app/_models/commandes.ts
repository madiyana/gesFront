import { Categories } from "./categories";
import { Articles } from "./articles";
import { Fournisseurs } from "./fournisseurs";
import { ArticleCommandes } from "./articleCommandes";
import { Employes } from ".";
 

export class Commandes {
    id: number;
    dateCommande: string;
    employes: Employes;
    articlesCommande: ArticleCommandes[];
    etatCommande: string;
    observation: string;



    constructor() {
        this.employes = null;
        this.dateCommande = null;
        this.etatCommande = null;
        this.articlesCommande = null;
        this.observation = null;
    }


   /* static verifyInput(article: Articles) {
        if (article.nom == null || article.seuilCritique == null || article.tva == null || article.prixAchat == null || article.uniteMesure == null
            || article.categorie == null || article.prixVenteHT == null || article.nom == "") {
            return false;
        }
        return true;
    }*/
}