import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { TaskPopupComponent } from './task-popup.component';

describe('TaskPopupComponent', () => {
  let component: TaskPopupComponent;
  let fixture: ComponentFixture<TaskPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskPopupComponent],
      imports: [FormsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Inicializar la tarea con valores predeterminados cuando no se proporciona tareaEdit', () => {
    expect(component.tarea).toEqual({
      id: '',
      titulo: '',
      descripcion: '',
      fechaVencimiento: jasmine.any(Date),
      prioridad: '',
      etiquetas: [],
      completada: ''
    });
  });

  it('Debería emitir tarea cuando se llama a submitForm', () => {
    const tarea = {
      id: '123',
      titulo: 'Tarea de prueba',
      descripcion: 'Descripción de la tarea',
      fechaVencimiento: new Date(),
      prioridad: 'alta',
      etiquetas: ['etiqueta1', 'etiqueta2'],
      completada: 'C'
    };
    spyOn(component.submit, 'emit');
    component.tarea = tarea;
    component.submitForm();
    expect(component.submit.emit).toHaveBeenCalledWith(tarea);
  });

  it('Debería de cerrar cuando se llama a closePopup', () => {
    spyOn(component.close, 'emit');
    component.closePopup();
    expect(component.close.emit).toHaveBeenCalled();
  });
});