import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerStatistiqueComponent } from './player-statistique.component';

describe('PlayerStatistiqueComponent', () => {
  let component: PlayerStatistiqueComponent;
  let fixture: ComponentFixture<PlayerStatistiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerStatistiqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerStatistiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
