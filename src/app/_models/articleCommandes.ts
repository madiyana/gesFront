import { Categories } from "./categories";
import { Articles } from "./articles";
import { Fournisseurs } from "./fournisseurs";
 

export class ArticleCommandes {
    id: number;
    nbreArticleCommande: number;
    articles: Articles;
    fournisseurs: Fournisseurs;



    constructor() {
        this.nbreArticleCommande = null;
        this.articles = null;
        this.fournisseurs = null;
    }


   /* static verifyInput(article: Articles) {
        if (article.nom == null || article.seuilCritique == null || article.tva == null || article.prixAchat == null || article.uniteMesure == null
            || article.categorie == null || article.prixVenteHT == null || article.nom == "") {
            return false;
        }
        return true;
    }*/
}