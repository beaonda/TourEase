import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterEstPage } from './register-est.page';

describe('RegisterEstPage', () => {
  let component: RegisterEstPage;
  let fixture: ComponentFixture<RegisterEstPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RegisterEstPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
