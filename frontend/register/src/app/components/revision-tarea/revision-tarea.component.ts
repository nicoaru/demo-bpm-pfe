import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Task} from "../../models/Task";
import {TaskService} from "../../services/task.service";
import {ActivatedRoute, Router} from "@angular/router";
import {toastError, toastSuccess} from "../../../main";


@Component({
  selector: 'app-revision-tarea',
  templateUrl: './revision-tarea.component.html',
  styleUrls: ['./revision-tarea.component.css']
})
export class RevisionTareaComponent implements OnInit {
  reviewForm!: FormGroup;
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
    this.reviewForm = formBuilder.group({
    title: [
      '',
    ],
    description: [
      '',
    ]
    })
    this.reviewForm.disable();
  }

  ngOnInit(): void {

    this.activatedRoute.queryParamMap.subscribe((params) => {
      this.bpmContextId = params.get('contextId');
      this.bpmWorklistTaskId = params.get('bpmWorklistTaskId');
      this.bpmWorklistContext = params.get('bpmWorklistContext');

      console.log('bpmWorklistTaskId:   ', this.bpmWorklistTaskId);
      console.log('bpmWorklistContext:   ', this.bpmWorklistContext);
    });
    this.getBpmPayload()
    setTimeout( () => this.getTask(), 2000)
  }

  async getTask() {
    this.taskService.getTask(this.payload.taskId).subscribe({
      next: (response: any) => {
        if (!response.error) {
          this.task = new Task();
          this.task._title = response.title;
          this.task._description = response.description;
          console.dir(this.task);
          this.reviewForm.patchValue({
            title: this.task._title,
            description: this.task._description,
          });
        }
      },
      error: (error: string) => {
        console.log('Error encontrando la tarea: ', error);
      },
    });
  }

  approveTask(){
    if(this.payload) {
      this.avanzarSolicitud(this.payload, 'APPROVE');
      toastSuccess
        .fire({
          icon: 'success',
          title: 'Tarea Aprobada',
        })
        .then(() => {
          this.disabled = true
        })
    }
    else {
      console.log("No se pudo obtener el payload. No se puede avanzar.");
      toastError
        .fire({
          icon: 'warning',
          title: 'Error al procesar solicitud',
        })
      }
    }

  rejectTask(){
    if(this.payload) {
      this.avanzarSolicitud(this.payload, 'REJECT');
      toastSuccess
        .fire({
          icon: 'error',
          title: 'Tarea Rechazada',
        })
        .then(() => {
          this.disabled = true
        })
    }
    else {
      console.log("No se pudo obtener el payload. No se puede avanzar.");
      toastError
        .fire({
          icon: 'warning',
          title: 'Error al procesar solicitud',
        })
    }
  }

  async getBpmPayload() {
    if (
      this.bpmContextId === null ||
      this.bpmWorklistTaskId === null ||
      this.bpmWorklistContext === null
    )
      return console.log('Faltan datos de BPM para obtener el payload');

    this.taskService
      .getBpmPayload(this.bpmWorklistTaskId, this.bpmWorklistContext)
      .subscribe({
        next: (response: any) => {
          if (!response.error) {
            this.payload = response;

            console.log('payload: ', JSON.stringify(this.payload));
          }
        },
        error: (error: string) => {
          console.log('Error solicitando bpm task payload: ', error);
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

  avanzarSolicitud(updatedPayload:Record<string, string>, outcome: string) {
    console.log("Entró en avanzarSolicitud");

    const body:Record<string, string> = {...updatedPayload, outcome};

    this.taskService.avanzarBpmProcess(this.bpmWorklistTaskId, this.bpmWorklistContext, body)
      .subscribe({
        next: (response: any) => {
          if (!response?.error) {
            console.log('AVANZAR SOLICITUD: OK');
          }
        },
        error: (error: string) => {
          console.log('Error haciendo avanzar la solicitud: ', error);
        },
      });
  }

}
