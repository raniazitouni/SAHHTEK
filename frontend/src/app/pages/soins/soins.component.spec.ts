import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoinsComponent } from './soins.component';

describe('SoinsComponent', () => {
  let component: SoinsComponent;
  let fixture: ComponentFixture<SoinsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SoinsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
