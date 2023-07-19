import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from '../../models/Task';
import { TaskService } from '../../services/task.service';
import { toastError, toastSuccess } from '../../../main';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-carga-tarea-form',
  templateUrl: './carga-tarea-form.component.html',
  styleUrls: ['./carga-tarea-form.component.css']
})
export class CargaTareaFormComponent implements OnInit {
  taskForm!: FormGroup;
  disabled: boolean = false;
  task: Task | undefined;
  payload: any;
  bpmContextId: any;
  bpmWorklistTaskId: any;
  bpmWorklistContext: any;
  loading: boolean = false;

  constructor(
    formBuilder: FormBuilder,
    private taskService: TaskService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.taskForm = formBuilder.group({
      title: [
        '',
        Validators.required
      ],
      description: [
        '',
        Validators.required
      ]
    });
  }

  ngOnInit(): void {

    this.activatedRoute.queryParamMap.subscribe((params) => {
      this.bpmContextId = params.get('contextId');
      this.bpmWorklistTaskId = params.get('bpmWorklistTaskId');
      this.bpmWorklistContext = params.get('bpmWorklistContext');

      console.log('bpmWorklistTaskId:   ', this.bpmWorklistTaskId);
      console.log('bpmWorklistContext:   ', this.bpmWorklistContext);
    });

    this.getBpmPayload();
  }

  addTask(): void {
    this.task = new Task(
      this.taskForm.value.title,
      this.taskForm.value.description,
    );

    this.taskService.addTask(this.task)
      .subscribe({
        next: (response:any) => {
          if (!response.error) {

            if(this.payload) {
              const updatedPayload = {...this.payload, taskId: response.id}
              this.avanzarSolicitud(updatedPayload);
            }
            else console.log("No se pudo obtener el payload. No se puede avanzar.");
            
            toastSuccess
            .fire({
              icon: 'success',
              title: 'Tarea Creada',
            })
              .then(() => {
                this.taskForm.disable()
                this.disabled = true
              })
          }
        },
        error: (error: string) => {
          this.loading = false;
          toastError.fire({
            icon: 'error',
            title: error,
          });
        }
      });
  }


  async getBpmPayload() {
    if (
      this.bpmContextId === null ||
      this.bpmWorklistTaskId === null ||
      this.bpmWorklistContext === null
    )
      return console.log('Faltan datos de BPM para obtener el payload');

    this.loading = true;
    this.taskService
      .getBpmPayload(this.bpmWorklistTaskId, this.bpmWorklistContext)
      .subscribe({
        next: (response: any) => {
          if (!response.error) {
            this.payload = response;

            console.log('payload: ', JSON.stringify(this.payload));
          }

          this.loading = false;
        },
        error: (error: string) => {
          console.log('Error solicitando bpm task payload: ', error);
          this.loading = false;
          
          toastError
          .fire({
            icon: 'warning',
            title: 'No se pudo obtener el payload de BPM',
          })
        },
      });
  }


  async updateBpmPayload(updatedPayload:Record<string, string>) {
    console.log("Entró en updateBpmPayload");

    this.taskService.updateBpmPayload(this.bpmWorklistTaskId, this.bpmWorklistContext, updatedPayload)
    .subscribe({
      next: (response: any) => {
        if (!response?.error) {
          console.log('updatedPayload: ', response);
        }

      },
      error: (error: string) => {
        console.log('Error haciendo update del payload: ', error);
      },
    });
  }


  avanzarSolicitud(updatedPayload:Record<string, string>) {
    console.log("Entró en avanzarSolicitud");
    this.loading = true;
    const body:Record<string, string> = {...updatedPayload, outcome: "SUBMIT"};

    this.taskService.avanzarBpmProcess(this.bpmWorklistTaskId, this.bpmWorklistContext, body)
    .subscribe({
      next: (response: any) => {
        this.loading = false;
        if (!response?.error) {
          console.log('AVANZAR SOLICITUD: OK');
        }
      },
      error: (error: string) => {
        this.loading = false;
        console.log('Error haciendo avanzar la solicitud: ', error);
        toastError
        .fire({
          icon: 'warning',
          title: 'Error intentando avanzar la solicitud',
        })
      },
    });
  }

}
