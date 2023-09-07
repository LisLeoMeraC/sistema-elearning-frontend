import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleOneComponent } from './module-one.component';

describe('ModuleOneComponent', () => {
  let component: ModuleOneComponent;
  let fixture: ComponentFixture<ModuleOneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModuleOneComponent]
    });
    fixture = TestBed.createComponent(ModuleOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
