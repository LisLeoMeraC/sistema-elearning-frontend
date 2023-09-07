import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleTwoComponent } from './module-two.component';

describe('ModuleTwoComponent', () => {
  let component: ModuleTwoComponent;
  let fixture: ComponentFixture<ModuleTwoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModuleTwoComponent]
    });
    fixture = TestBed.createComponent(ModuleTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
