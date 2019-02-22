import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeCreerComponent } from './employe-creer.component';

describe('EmployeCreerComponent', () => {
  let component: EmployeCreerComponent;
  let fixture: ComponentFixture<EmployeCreerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeCreerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeCreerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
