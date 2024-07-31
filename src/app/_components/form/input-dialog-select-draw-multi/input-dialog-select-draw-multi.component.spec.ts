import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputDialogSelectDrawMultiComponent } from './input-dialog-select-draw-multi.component';

describe('InputDialogSelectDrawMultiComponent', () => {
  let component: InputDialogSelectDrawMultiComponent;
  let fixture: ComponentFixture<InputDialogSelectDrawMultiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputDialogSelectDrawMultiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputDialogSelectDrawMultiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
