import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListOfWorkersComponent } from './Workers/list-of-workers/list-of-workers.component';
import { AddWorkerComponent } from './Workers/add-worker/add-worker.component';
import { EditWorkerComponent } from './Workers/edit-worker/edit-worker.component';
import { ListOfTasksComponent } from './Tasks/list-of-tasks/list-of-tasks.component';
import { AddTaskComponent } from './Tasks/add-task/add-task.component';
import { EditTaskComponent } from './Tasks/edit-task/edit-task.component';
import { MoveTaskComponent } from './Tasks/move-task/move-task.component';

const routes: Routes = [
  {path:'',component:ListOfWorkersComponent,pathMatch:'full'},
  {path : 'add_worker', component:AddWorkerComponent},
  {path : 'edit_worker/:id',component: EditWorkerComponent},
  {path : 'worker/:id/tasks',component: ListOfTasksComponent},
  {path : 'worker/:id/tasks/add_task',component: AddTaskComponent},
  {path : 'worker/:id/tasks/:idTask/edit',component: EditTaskComponent},
  {path : 'worker/:id/tasks/:idTask/move',component: MoveTaskComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
