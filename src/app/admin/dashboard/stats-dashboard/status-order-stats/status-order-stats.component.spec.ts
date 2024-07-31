import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusOrderStatsComponent } from './status-order-stats.component';

describe('StatusOrderStatsComponent', () => {
  let component: StatusOrderStatsComponent;
  let fixture: ComponentFixture<StatusOrderStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatusOrderStatsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatusOrderStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
