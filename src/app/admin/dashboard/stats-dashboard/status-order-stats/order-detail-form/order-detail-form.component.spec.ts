import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDetailFormComponent } from './order-detail-form.component';

describe('OrderDetailFormComponent', () => {
  let component: OrderDetailFormComponent;
  let fixture: ComponentFixture<OrderDetailFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderDetailFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrderDetailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
