import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandesCreerComponent } from './commandes-creer.component';

describe('CommandesCreerComponent', () => {
  let component: CommandesCreerComponent;
  let fixture: ComponentFixture<CommandesCreerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommandesCreerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandesCreerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
