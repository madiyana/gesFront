import { Component, OnInit } from '@angular/core';
import { ArticleRetour } from '../../../_models/retourArticle';
import { ArticleRetourService } from '../../../_services/article-retour.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-consult-article-retour',
  templateUrl: './consult-article-retour.component.html'
})
export class ConsultArticleRetourComponent implements OnInit {

  id: number;
  articleRetour: ArticleRetour;
  constructor(
    private articleRetourService: ArticleRetourService,
    private route: ActivatedRoute,
    private router: Router) {

  }

  ngOnInit() {
    this.afficheStock();
  }

  afficheStock() {
    this.id = JSON.parse(localStorage.getItem('idArticleRetour'));
    this.articleRetourService.getById(this.id).subscribe(
      data => {
        this.articleRetour = data;
      }
    );
  }

  retourListe() {
    this.router.navigate(['retourArticle']);
   }

  modifier() {
    localStorage.setItem('pageArticleRetour', 'modif');
    this.router.navigate(['retourArticle/creer']);
  }

}
