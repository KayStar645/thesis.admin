import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputRadioMultiComponent } from './input-radio-multi.component';

describe('InputRadioMultiComponent', () => {
  let component: InputRadioMultiComponent;
  let fixture: ComponentFixture<InputRadioMultiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputRadioMultiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputRadioMultiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
