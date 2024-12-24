import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratinComponent } from './laboratin.component';

describe('LaboratinComponent', () => {
  let component: LaboratinComponent;
  let fixture: ComponentFixture<LaboratinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaboratinComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaboratinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
