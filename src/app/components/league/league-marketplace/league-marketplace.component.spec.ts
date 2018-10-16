import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeagueMarketplaceComponent } from './league-marketplace.component';

describe('LeagueMarketplaceComponent', () => {
  let component: LeagueMarketplaceComponent;
  let fixture: ComponentFixture<LeagueMarketplaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeagueMarketplaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeagueMarketplaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
