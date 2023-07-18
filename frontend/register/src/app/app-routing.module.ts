import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CargaTareaFormComponent } from './components/carga-tarea-form/carga-tarea-form.component';

const routes: Routes = [
  { path: '', component: CargaTareaFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
