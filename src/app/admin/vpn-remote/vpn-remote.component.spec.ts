import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VpnRemoteComponent } from './vpn-remote.component';

describe('VpnRemoteComponent', () => {
  let component: VpnRemoteComponent;
  let fixture: ComponentFixture<VpnRemoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VpnRemoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VpnRemoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
