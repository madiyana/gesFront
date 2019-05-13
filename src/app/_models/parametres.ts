export class Parametres {
  id: number;
  nom: string;
  adresse: string;
  adresseSuite: string;
  telephone: string;
  imprimante: string;
  messageFoot: string;

  static verifyInput(paramtres: Parametres) {
    if (
      !paramtres.nom ||
      !paramtres.adresse ||
      !paramtres.telephone ||
      !paramtres.adresseSuite ||
      !paramtres.imprimante ||
      !paramtres.messageFoot
    ) {
      return false;
    }
    return true;
  }
}
