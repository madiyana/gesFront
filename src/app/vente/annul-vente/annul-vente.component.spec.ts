import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnulVenteComponent } from './annul-vente.component';

describe('AnnulVenteComponent', () => {
  let component: AnnulVenteComponent;
  let fixture: ComponentFixture<AnnulVenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnulVenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnulVenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
