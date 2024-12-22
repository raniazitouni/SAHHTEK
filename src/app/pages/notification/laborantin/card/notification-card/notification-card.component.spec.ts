import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationCardComponent } from './notification-card.component';
import { CommonModule } from '@angular/common';

describe('NotificationCardComponent', () => {
  let component: NotificationCardComponent;
  let fixture: ComponentFixture<NotificationCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationCardComponent,CommonModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
