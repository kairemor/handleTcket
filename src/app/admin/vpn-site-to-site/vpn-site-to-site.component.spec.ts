import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VpnSiteToSiteComponent } from './vpn-site-to-site.component';

describe('VpnSiteToSiteComponent', () => {
  let component: VpnSiteToSiteComponent;
  let fixture: ComponentFixture<VpnSiteToSiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VpnSiteToSiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VpnSiteToSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
