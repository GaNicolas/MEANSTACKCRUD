import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PangolinProfileEditComponent } from './pangolin-profile-edit.component';

describe('PangolinProfileEditComponent', () => {
  let component: PangolinProfileEditComponent;
  let fixture: ComponentFixture<PangolinProfileEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PangolinProfileEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PangolinProfileEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
