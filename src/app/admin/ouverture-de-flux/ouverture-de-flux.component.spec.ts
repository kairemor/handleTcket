import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OuvertureDeFluxComponent } from './ouverture-de-flux.component';

describe('OuvertureDeFluxComponent', () => {
  let component: OuvertureDeFluxComponent;
  let fixture: ComponentFixture<OuvertureDeFluxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OuvertureDeFluxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OuvertureDeFluxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
