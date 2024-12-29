import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationRadiologueComponent } from './notification-radiologue.component';

describe('RadiologueComponent', () => {
  let component: NotificationRadiologueComponent;
  let fixture: ComponentFixture<NotificationRadiologueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationRadiologueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationRadiologueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
