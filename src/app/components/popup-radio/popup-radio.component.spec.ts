import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupRadioComponent } from './popup-radio.component';

describe('PopupRadioComponent', () => {
  let component: PopupRadioComponent;
  let fixture: ComponentFixture<PopupRadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupRadioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
