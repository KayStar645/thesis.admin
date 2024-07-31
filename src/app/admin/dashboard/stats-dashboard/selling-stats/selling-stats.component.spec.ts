import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellingStatsComponent } from './selling-stats.component';

describe('SellingStatsComponent', () => {
  let component: SellingStatsComponent;
  let fixture: ComponentFixture<SellingStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SellingStatsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SellingStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
