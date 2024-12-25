import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPageComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing'; 
import { FormsModule } from '@angular/forms'; 

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginPageComponent], 
      imports: [
        FormsModule, 
        RouterTestingModule 
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPageComponent); 
    component = fixture.componentInstance; 
    fixture.detectChanges(); 
  });

  it('should create', () => {
    expect(component).toBeTruthy(); 
  });

  it('should open and close modal', () => {
    component.openModal(); 
    expect(component.isModalOpen).toBeTrue();

    component.closeModal(); 
    expect(component.isModalOpen).toBeFalse(); 
  });
});
