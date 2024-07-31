import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignRolePermissionComponent } from './assign-role-permission.component';

describe('AssignRolePermissionComponent', () => {
  let component: AssignRolePermissionComponent;
  let fixture: ComponentFixture<AssignRolePermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssignRolePermissionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssignRolePermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
