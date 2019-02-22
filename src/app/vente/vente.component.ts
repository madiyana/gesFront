import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ArticlesService } from '../_services/articles.service';
import { LigneArticle } from '../_models/ligneArticle';
import { AuthenticationService } from '../_services';

@Component({
  selector: 'app-vente',
  templateUrl: './vente.component.html',
  styleUrls: ['./vente.component.css']
})
export class VenteComponent implements OnInit {
  data: any;
  group: FormGroup;
  list: LigneArticle[] = [];
  montantTotal = 0;
  idSelect = [];
  @ViewChild('reference') firstNameElement: ElementRef;

  constructor(
    private fb: FormBuilder,
    private articleService: ArticlesService,
    private authentificationService: AuthenticationService
  ) {
    this.initGroup();
  }
  initGroup() {
    this.group = this.fb.group({
      reference: [null, Validators.required],
      nom: [null],
      prix: [null],
      quantite: [null],
      montantTotal: [null]
    });
  }

  changeQte(val) {
    if (val === 'del') {
      if (this.v.quantite) {
        this.v.quantite = this.v.quantite.substr(0, this.v.quantite.length - 1);
      }
    } else if (!this.v.quantite && val) {
      this.v.quantite = val;
    } else {
      this.v.quantite = this.v.quantite + '' + val;
    }
   this.group.get('quantite').setValue(this.v.quantite);
   this.autoFocusInput();
  }

  ngOnInit() {
    this.autoFocusInput();
  }

  submit($event) {
    if (this.group.invalid) {
      alert('Form is not valid');
      return;
    }
    if ($event) {
      $event.preventDefault();
    }

    let quantite = this.v.quantite;
    if (!this.v.quantite ||  !Number(this.v.quantite)) {
      quantite = 1;
    }
    // Get produit with reference
    this.articleService.getByReference(this.v.reference).subscribe(data => {
      this.v.prix = data.prixVenteHT;
      this.v.nom = data.nom;
      this.v.reference = data.reference;
      this.v.quantite = quantite;
      let addIsPossible = true;
      this.list.forEach(current => {
        if (current.reference === this.v.reference) {
          current.quantite = Number(current.quantite) + Number(quantite);
          current.montantTotal = current.quantite * current.prix;
          addIsPossible = false;
        }
      });
      this.montantTotal = this.montantTotal + this.v.prix * this.v.quantite;
      if (addIsPossible) {
        this.v.montantTotal = this.montantTotal;
        this.list.push(this.v);
      }
      this.initGroup();
     });
  }

  addProduit() {
    if (this.v && this.v.reference && this.v.reference.length === 4) {
      this.submit(null);
    }
  }
  reinitVente() {
    this.group.reset({
       quantite: [null]
    });
    this.list.length = 0;
    this.montantTotal = 0;
    this.autoFocusInput();
  }

  removeLine(ind) {
    if (confirm('Are you sure to delete ')) {
      this.montantTotal = this.montantTotal - this.list[ind].quantite * this.list[ind].prix;
      this.list.splice(ind, 1);
    }
  }
  get v() {
    return this.group.value;
  }
  get f() {
    return this.group.controls;
  }

  displayFolder($event, art) {
  }

  autoFocusInput() {
    this.firstNameElement.nativeElement.focus();
  }
}
