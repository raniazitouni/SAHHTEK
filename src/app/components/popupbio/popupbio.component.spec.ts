import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupbioComponent } from './popupbio.component';

describe('PopupbioComponent', () => {
  let component: PopupbioComponent;
  let fixture: ComponentFixture<PopupbioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupbioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupbioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
