import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputDialogSelectComponent } from './input-dialog-select.component';

describe('InputDialogSelectComponent', () => {
  let component: InputDialogSelectComponent;
  let fixture: ComponentFixture<InputDialogSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputDialogSelectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputDialogSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
