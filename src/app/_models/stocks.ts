import { Categories } from './categories';
import { Fournisseurs } from './fournisseurs';
import { Articles } from './articles';
import { Commandes } from './commandes';

export class Stocks {
  id: number;
  dateEntree: string;
  quantite: number; //commande
  fournisseurs: Fournisseurs;
  articles: Articles;
  commandes: Commandes;
  nbArticlesDefectueux: number;
  quantiteReelle: number;
  observation: string;

  constructor() {
    this.dateEntree = null;
    this.quantite = 0;
    this.articles = null;
    this.commandes = null;
    this.fournisseurs = null;
    this.nbArticlesDefectueux = 0;
    this.quantiteReelle = 0;
    this.observation = null;
  }

  static verifyInput(stock: Stocks) {
    if (
      stock.articles == null ||
      stock.fournisseurs == null ||
      stock.quantite == null ||
      stock.dateEntree == null ||
      stock.nbArticlesDefectueux == null ||
      stock.dateEntree === ''
    ) {
      return false;
    }
    return true;
  }
}
