import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CargaTareaFormComponent } from './components/carga-tarea-form/carga-tarea-form.component';
import {RevisionTareaComponent} from "./components/revision-tarea/revision-tarea.component";

const routes: Routes = [
  { path: 'carga', component: CargaTareaFormComponent },
  { path: 'revision', component: RevisionTareaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
