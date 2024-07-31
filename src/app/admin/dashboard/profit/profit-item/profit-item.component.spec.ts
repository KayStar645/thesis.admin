import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfitItemComponent } from './profit-item.component';

describe('ProfitItemComponent', () => {
  let component: ProfitItemComponent;
  let fixture: ComponentFixture<ProfitItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfitItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfitItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
