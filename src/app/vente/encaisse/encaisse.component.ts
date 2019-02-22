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
      montantEncaisse: [null]
    });
  }

  ngOnInit() {}

  init() {
    this.rendu = 0;
    this.group.reset({});
    this.montantTotal = 0;
    this.finishPay.emit();
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
    if (confirm('Are you sure to cancel ')) {
      this.init();
    }
  }

  payer() {
    this.venteService.create(this.list, this.v.montantEncaisse, this.rendu, this.montantTotal, this.authenticationService.infoUser().id).subscribe(data => {
      this.init();
    });

  }
}
