import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierOrderFormComponent } from './supplier-order-form.component';

describe('SupplierOrderFormComponent', () => {
  let component: SupplierOrderFormComponent;
  let fixture: ComponentFixture<SupplierOrderFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SupplierOrderFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SupplierOrderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
