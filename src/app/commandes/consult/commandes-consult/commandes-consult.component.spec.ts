import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandesConsultComponent } from './commandes-consult.component';

describe('CommandesConsultComponent', () => {
  let component: CommandesConsultComponent;
  let fixture: ComponentFixture<CommandesConsultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommandesConsultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandesConsultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
