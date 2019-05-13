import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { VenteService } from '../../_services/vente.service';
import { AuthenticationService } from '../../_services';

@Component({
  selector: 'app-encaisse',
  templateUrl: './encaisse.component.html',
  styleUrls: ['./encaisse.component.css']
})
export class EncaisseComponent implements OnInit {
  _montantTotal = 0;

  get montantTotal() {
    return this._montantTotal;
}
showCb = false;
showEsp = false;
showChq = false;
showJoni = false;
showOM = false;
@Input('montantTotal')
set montantTotal(montantTotal) {
    this._montantTotal = montantTotal;
    this.reste();
}
  @Input() list;
  rendu = 0;
  group: FormGroup;
  @Output() finishPay = new EventEmitter();

  constructor(fb: FormBuilder, private venteService: VenteService,
    private authenticationService: AuthenticationService) {
    this.group = fb.group({
      montantEncaisse: [null],
      codeOrangeMoney: [null]
    });
  }

  ngOnInit() {}

  init() {
    this.rendu = 0;
    this.group.reset({});
    this.montantTotal = 0;
    this.finishPay.emit();
    this.initAllTypePaiement();
  }
  submit($event) {
    if (this.group.invalid) {
      alert('Form is not valid');
      return;
    }
    this.init();
  }

  reste() {
    this.rendu = Number(this.v.montantEncaisse) - Number(this.montantTotal);
  }
  get v() {
    return this.group.value;
  }
  get f() {
    return this.group.controls;
  }

  cancelVente() {
    if (confirm('Voulez vous annuler la vente en cours ? ')) {
      this.init();
    }
  }

  payer(typePaiement) {
    // tslint:disable-next-line:max-line-length
   this.venteService.create(this.list, this.v.montantEncaisse, this.rendu, this.montantTotal, this.authenticationService.infoUser().id, typePaiement).subscribe(data => {
      this.init();
    });
  }

  initAllTypePaiement() {
    this.showCb = false;
    this.showEsp = false;
    this.showChq = false;
    this.showJoni = false;
    this.showOM = false;
  }
  changeTypePaiement(type) {
    this.initAllTypePaiement();
    switch (type) {
      case 'ESP':
        this.showEsp = true;
        break;
      case 'OM':
        this.showOM = true;
        break;
      case 'ESP':

        break;
      default:
        break;
    }
  }
}
