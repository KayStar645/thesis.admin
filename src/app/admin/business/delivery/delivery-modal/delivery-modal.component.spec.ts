import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryModalComponent } from './delivery-modal.component';

describe('DeliveryModalComponent', () => {
  let component: DeliveryModalComponent;
  let fixture: ComponentFixture<DeliveryModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeliveryModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeliveryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
