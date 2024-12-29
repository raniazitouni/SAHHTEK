import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRadioComponent } from './add-radio.component';

describe('AddRadioComponent', () => {
  let component: AddRadioComponent;
  let fixture: ComponentFixture<AddRadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddRadioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
