import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutreDemandeComponent } from './autre-demande.component';

describe('AutreDemandeComponent', () => {
  let component: AutreDemandeComponent;
  let fixture: ComponentFixture<AutreDemandeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutreDemandeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutreDemandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
