import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Articles } from '../../_models/index';
 import { ActivatedRoute, Router } from '@angular/router';
import { ArticlesService } from '../../_services/articles.service';

@Component({
  selector: 'app-article-consult',
  templateUrl: './article-consult.component.html',
  styleUrls: []
})
export class ArticleConsultComponent implements OnInit {

  idArticle: number;
  article: Articles;
  constructor( private articleService: ArticlesService,
    private route: ActivatedRoute,
    private router: Router) {
   }

  ngOnInit() {
    this.afficheArticle();
  }

  afficheArticle() {
    this.idArticle = JSON.parse(localStorage.getItem('idArticle'));
    this.articleService.getById(this.idArticle).subscribe(
      data => {
        this.article = data;
      }
    );
  }

  retourListe() {
    this.router.navigate(['articles']);
  }

  modifier() {
    localStorage.setItem('pageArticle', 'modif');
    this.router.navigate(['articles/creer']);
  }
}
