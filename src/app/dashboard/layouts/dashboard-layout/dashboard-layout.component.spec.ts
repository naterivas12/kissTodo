import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { DashboardLayoutComponent } from './dashboard-layout.component';
import { TasksService } from '../../services/tasks.service';
import { of } from 'rxjs';
import { Tasks } from '../../interfaces/tasks.interface';

describe('DashboardLayoutComponent', () => {
  let component: DashboardLayoutComponent;
  let fixture: ComponentFixture<DashboardLayoutComponent>;
  let tasksServiceSpy: jasmine.SpyObj<TasksService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('TasksService', ['obtenerTareas', 'filtrarTareas']);

    await TestBed.configureTestingModule({
      declarations: [ DashboardLayoutComponent ],
      imports: [ FormsModule ],
      providers: [
        { provide: TasksService, useValue: spy }
      ]
    })
    .compileComponents();

    tasksServiceSpy = TestBed.inject(TasksService) as jasmine.SpyObj<TasksService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear', () => {
    expect(component).toBeTruthy();
  });

  it('debería recuperar tareas cuando se llama a ngOnInit', () => {
    const mockTasks: Tasks[] = [
      {
        id: "318346b3-b702-430b-b4c8-4794d49003ca",
        titulo: "Task 1",
        descripcion: "Descripcion",
        fechaVencimiento: new Date(),
        prioridad: "media",
        etiquetas: ["persona1","persona2"],
        completada: "C"
      },
      {
        id: "318346b3-b702-430b-b4c8-4794d49003cb",
        titulo: "Task 2",
        descripcion: "Descripcion",
        fechaVencimiento: new Date(),
        prioridad: "media",
        etiquetas: ["persona1","persona2"],
        completada: "C"
      },
    ];
    tasksServiceSpy.obtenerTareas.and.returnValue(of(mockTasks));

    component.ngOnInit();

    expect(tasksServiceSpy.obtenerTareas).toHaveBeenCalled();
    expect(component.tareas).toEqual(mockTasks);
  });


  it('Debe aplicar filtros y buscar tareas cuando se llama aplicarFiltros', () => {
    const mockFilteredTasks: Tasks[] = [{
      id: "318346b3-b702-430b-b4c8-4794d49003cb",
      titulo: "Task 2",
      descripcion: "Descripcion",
      fechaVencimiento:new Date(),
      prioridad: "alta",
      etiquetas: ["persona1","persona2"],
      completada: "C"
      },
    ];
    const mockPrioridad = 'alta';
    const mockCompletada = 'C';
    tasksServiceSpy.filtrarTareas.and.returnValue(of(mockFilteredTasks));

    component.filtros = { prioridad: mockPrioridad, completada: mockCompletada };
    component.aplicarFiltros();

    expect(tasksServiceSpy.filtrarTareas).toHaveBeenCalledWith(mockPrioridad, mockCompletada);
    expect(component.tareas).toEqual(mockFilteredTasks);
  });

  it('debe recuperar todas las tareas cuando no se aplican filtros', () => {
    const mockTasks: Tasks[] = [
      {
        id: "318346b3-b702-430b-b4c8-4794d49003ca",
        titulo: "Task 1",
        descripcion: "Descripcion",
        fechaVencimiento:new Date(),
        prioridad: "media",
        etiquetas: ["persona1","persona2"],
        completada: "C"
    },
    {
      id: "318346b3-b702-430b-b4c8-4794d49003cb",
      titulo: "Task 2",
      descripcion: "Descripcion",
      fechaVencimiento:new Date(),
      prioridad: "media",
      etiquetas: ["persona1","persona2"],
      completada: "C"
  },
    ];
    tasksServiceSpy.obtenerTareas.and.returnValue(of(mockTasks));

    component.filtros = { prioridad: '', completada: '' }; 
    component.aplicarFiltros();

    expect(tasksServiceSpy.filtrarTareas).not.toHaveBeenCalled();
    expect(component.tareas).toEqual(mockTasks);
  });
});