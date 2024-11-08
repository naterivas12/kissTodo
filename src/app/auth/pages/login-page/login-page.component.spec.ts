import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginPageComponent } from './login-page.component';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginPageComponent],
      imports: [ReactiveFormsModule, RouterTestingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe inicializar el formulario con los valores predeterminados', () => {
    expect(component.myForm.value).toEqual({
      email: 'prueba.pass@gmail.com',
      password: 'pruebaSeleccion'
    });
  });

  it('Debe marcar el campo de correo electrónico como no válido si se deja vacío', () => {
    const emailField = component.myForm.controls['email'];
    emailField.setValue('');
    expect(emailField.invalid).toBeTruthy();
    expect(emailField.errors?.['required']).toBeTruthy(); 
  });

 it('Debe marcar el campo de contraseña como no válido si tiene menos de 6 caracteres', () => {
  const passwordField = component.myForm.controls['password'];
  passwordField.setValue('12345');
  expect(passwordField.invalid).toBeTruthy();
  expect(passwordField.errors?.['minlength']).toBeTruthy(); 
});

  it('debe habilitar el botón de inicio de sesión cuando el formulario sea válido', () => {
    component.myForm.controls['email'].setValue('test@example.com');
    component.myForm.controls['password'].setValue('password123');
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button.disabled).toBeFalsy();
  });
});