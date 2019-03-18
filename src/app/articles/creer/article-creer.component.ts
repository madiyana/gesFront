import { Component, OnInit } from '@angular/core';
import { Employes, Articles, Rayon } from '../../_models/index';
import { Router, ActivatedRoute } from '@angular/router';
import { CategorieService } from '../../_services/categories.service';
 import { ArticlesService } from '../../_services/articles.service';
import { Categories } from '../../_models/categories';
import { UniteMesure } from '../../_models/uniteMesure';
import { AlertService } from 'angular-x-alerts';
import { RayonService } from '../../_services/rayons.service';
import { UnitemesureService } from '../../_services/unitemesure.service';

@Component({
  selector: 'app-article-creer',
  templateUrl: './article-creer.component.html',
  styleUrls: []
})
export class ArticleCreerComponent implements OnInit {

  article = new Articles();
  nom: string;
  idArticle: number;
  categories: Categories[];
  rayon: Rayon[];
  unitsMesure: UniteMesure[];
  public items: Array<any>;
  isEditabble = false;
  public page: string;
  refCheck = false;
  isPageModif = false;
  constructor(
    private articleService: ArticlesService,
    private alertService: AlertService,
    private categorieService: CategorieService,
    private rayonService: RayonService,
    private uniteMesureService: UnitemesureService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    // Faire mise a jour dans cette page ==> Recupere id
    this.page = localStorage.getItem('pageArticle');
    this.idArticle = JSON.parse(localStorage.getItem('idArticle'));
    if (this.page === 'modif' && this.idArticle) {
      this.isPageModif = true;
      this.articleService.getById(this.idArticle).subscribe(
        data => {
          this.article = data;
        }
      );
    }

    this.loadDataCreate();

  }

  loadDataCreate() {
    // Load categories
    this.categorieService.getAll().subscribe(
      data => {
        this.categories = data;
      }
    );

    // Load Unit mesure
    this.uniteMesureService.getAll().subscribe(
      data => {
        this.unitsMesure = data;
      }
    );

    // Load rayons
    this.rayonService.getAll().subscribe(
      data => {
        this.rayon = data;
      }
    );
  }

  enregistrer() {
    // tslint:disable-next-line:max-line-length
    if (!this.isPageModif && !this.refCheck && !this.article.reference) { // si le check reffernce nest pas selectionne, la saisie de la reference est obligatoire
      this.alertService.error('Veuillez remplir la référence de l\'artice');
    } else if (this.isPageModif && !this.article.reference) {
      this.alertService.error('Veuillez remplir la référence de l\'artice');
    } else {
      if (Articles.verifyInput(this.article)) {
        if (!Number(this.article.prixAchat) || !Number(this.article.prixVenteHT) || !Number(this.article.seuilCritique)) {
          this.alertService.error('Le prix achat, vente et seuil critique doivent etre des chiffres');
          return;
        }
      this.articleService.create(this.article).subscribe(
         data => {
           localStorage.setItem('idArticle', data.id.toString());
           this.router.navigate(['articles/consult']);
         },
         error => {
           this.alertService.error('Erreur technique lors de l\'enregistrement');
         });
     }else {
       this.alertService.error('Veuillez remplir les champs obligatoires');
     }
    }
  }

  retourListe() {
    this.router.navigate(['articles']);
  }

  vider() {
    this.article = new Articles();
  }


  compareCategories(c1: Categories, c2: Categories): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  compareUnitMesure(c1: UniteMesure, c2: UniteMesure): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  checkSelected(e) {
    if (e.target.checked) {
/*       if (this.isPageModif)
 */        this.article.reference = null;
        this.isEditabble = true;
    } else {
      this.isEditabble = false;
    }
 }

}
