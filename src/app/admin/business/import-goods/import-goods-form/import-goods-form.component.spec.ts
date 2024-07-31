import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportGoodsFormComponent } from './import-goods-form.component';

describe('ImportGoodsFormComponent', () => {
  let component: ImportGoodsFormComponent;
  let fixture: ComponentFixture<ImportGoodsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImportGoodsFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImportGoodsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
