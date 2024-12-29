import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DPIComponent } from './dpi.component';

describe('DPIComponent', () => {
  let component: DPIComponent;
  let fixture: ComponentFixture<DPIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DPIComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DPIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
