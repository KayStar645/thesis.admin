import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributorModalComponent } from './distributor-modal.component';

describe('DistributorModalComponent', () => {
  let component: DistributorModalComponent;
  let fixture: ComponentFixture<DistributorModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DistributorModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DistributorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
