import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeConsultComponent } from './employe-consult.component';

describe('EmployeConsultComponent', () => {
  let component: EmployeConsultComponent;
  let fixture: ComponentFixture<EmployeConsultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeConsultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeConsultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
