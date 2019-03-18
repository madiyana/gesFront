import { Categories } from "./categories";
import { Fournisseurs } from "./fournisseurs";
import { Articles } from "./articles";
import { Commandes } from "./commandes";

export class ArticleRetour {
  id: number;
  quantite: number;
  fournisseurs: Fournisseurs;
  articles: Articles;
  commandes: Commandes;
  commentaire: string;

  constructor() {
    this.quantite = 0;
    this.articles = null;
    this.commandes = null;
    this.fournisseurs = null;
    this.commentaire = null;
  }

  static verifyInput(articleRetour: ArticleRetour): any {
    if (
      !articleRetour.articles ||
      !articleRetour.fournisseurs ||
      !articleRetour.quantite ||
      !articleRetour.commandes ||
      !articleRetour.commentaire
    ) {
      return false;
    }
    return true;
  }
}
