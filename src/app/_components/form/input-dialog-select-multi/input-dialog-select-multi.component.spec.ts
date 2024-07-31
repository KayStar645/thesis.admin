import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputDialogSelectMultiComponent } from './input-dialog-select-multi.component';

describe('InputDialogSelectMultiComponent', () => {
  let component: InputDialogSelectMultiComponent;
  let fixture: ComponentFixture<InputDialogSelectMultiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputDialogSelectMultiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputDialogSelectMultiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
