import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './notification.component';
import { NotificationRadiologueComponent } from './radiologue/notification-radiologue.component';
import { LaboratinNotificationsComponent } from './laborantin/notification-laborantin.component';



describe('NotificationComponent', () => {
  let component: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        NotificationComponent,
        NotificationRadiologueComponent,
        LaboratinNotificationsComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
