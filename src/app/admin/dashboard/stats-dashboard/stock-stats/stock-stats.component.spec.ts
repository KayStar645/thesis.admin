import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockStatsComponent } from './stock-stats.component';

describe('StockStatsComponent', () => {
  let component: StockStatsComponent;
  let fixture: ComponentFixture<StockStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StockStatsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StockStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
