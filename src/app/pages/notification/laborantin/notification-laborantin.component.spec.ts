import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts'; 
import { LaboratinNotificationsComponent } from './notification-laborantin.component';

describe('NotificationLaborantinComponent', () => {
  let component: LaboratinNotificationsComponent;
  let fixture: ComponentFixture<LaboratinNotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaboratinNotificationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaboratinNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
