import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyProductToPromotionComponent } from './apply-product-to-promotion.component';

describe('ApplyProductToPromotionComponent', () => {
  let component: ApplyProductToPromotionComponent;
  let fixture: ComponentFixture<ApplyProductToPromotionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApplyProductToPromotionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApplyProductToPromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
