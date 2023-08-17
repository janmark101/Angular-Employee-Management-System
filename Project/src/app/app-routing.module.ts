import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DodajPracownikaComponent } from './dodaj-pracownika/dodaj-pracownika.component';
import { ListaPracownikowComponent } from './lista-pracownikow/lista-pracownikow.component';
import { EdytujPracComponent } from './edytuj-prac/edytuj-prac.component';
import { ZadaniaComponent } from './zadania/zadania.component';
import { NoweZadanieComponent } from './zadania/nowe-zadanie/nowe-zadanie.component';
import { EditTaskComponent } from './zadania/edit-task/edit-task.component';
import { MoveTaskComponent } from './zadania/move-task/move-task.component';

const routes: Routes = [
  { path: '', component: ListaPracownikowComponent, pathMatch:'full' },
  { path: 'add_worker', component: DodajPracownikaComponent },
  { path: 'edit_worker/:id', component: EdytujPracComponent },
  { path: 'user/:id/zadania', component: ZadaniaComponent },
  { path: 'user/:id/zadania/nowe_zadanie', component: NoweZadanieComponent },
  { path: 'user/:id/zadania/:idTask/edit', component: EditTaskComponent },
  { path: 'user/:id/zadania/:idTask/move', component: MoveTaskComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
