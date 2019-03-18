export class DateValidator{

  static inputErrorClass :String = "has-error has-feedback";

   /** Retourner la date selon le cas de saisi : 00/00/YYYY ou dd/MM/YYYY */
   static getDateFormat(day: string, month: string, year: string) {
      if (day && month && year) {
          const today = new Date();
          // Annee au format XXXX
          if (year.length != 4) {
              return null;
          }
          //if (day && month && year) {
          // Verifier le format de la date saisie
          // Cas 1 : 00/00/YYYY ==> On ne verifie pas la validé de la date sauf l'année qui doit <= année en cours
          if (day === "00" && month === "00" /*&& parseInt(year) < Number(new Date().getFullYear())*/) {
              return year + month + day;
          } else {
              // Cas 2 : dd/MM/YYYY ==> On verifie la validité de la  date
              if (this.checkValidatyDate(day, month, year)) { // Si date valide
                  return year + month + day;
              }
          }
          //}
      }
      return null;
  }

  /** Verifie si la date saisi dd/MM/YYYY est valide */
  static checkValidatyDate(day: string, month: string, year: string) {
      if (isNaN(Number(month)) || isNaN(Number(day)) || isNaN(Number(year))) {
          return false;
      }

      var currentYear = Number(new Date().getFullYear());
      let monthParse = Number(month);
      let dayParse = Number(day);
      let yearParse = Number(year);

      if (monthParse < 1 || monthParse > 12) { // check month range
          return false;
      }
      if (dayParse < 1 || dayParse > 31) {
          return false;
      }
      if ((monthParse === 4 || monthParse === 6 || monthParse === 9 || monthParse === 11) && dayParse === 31) {
          return false;
      }
      if (monthParse == 2) { // check for february 29th
          var isleap = (yearParse % 4 === 0 && (yearParse % 100 !== 0 || yearParse % 400 === 0));
          if (dayParse > 29 || (dayParse === 29 && !isleap)) {
              return false;
          }
      }
      /*  if (yearParse > currentYear) {
            return false;
        }*/
      return true;
  }



  static isValidDate(day, month, year) {
      if (day && month && year) {
          let checkDate = this.getDateFormat(day, month, year);
          if (checkDate == null) {
              return false; // Mauvais format des dates
          }
      }
      return true;
  }

  static isAfterDateOfDay(day, month, year) {
      if (day && month && year) {
          if (this.isValidDate(day, month, year)) {
              let today = new Date().toISOString().slice(0, 10)
              today = today.split('-').join('');
               let checkDate = this.getDateFormat(day, month, year);
              if (checkDate == null || Number(checkDate) > Number(today)) {
                  return true; // Mauvais format des dates
              }
          }
      }
      return false;
  }
}
