import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListOfWorkersComponent } from './Workers/list-of-workers/list-of-workers.component';
import { EditWorkerComponent } from './Workers/edit-worker/edit-worker.component';
import { AddWorkerComponent } from './Workers/add-worker/add-worker.component';
import { ListOfTasksComponent } from './Tasks/list-of-tasks/list-of-tasks.component';
import { DropDownComponent } from './drop-down/drop-down.component';
import {MatSliderModule} from '@angular/material/slider';
import { EditTaskComponent } from './Tasks/edit-task/edit-task.component';
import { MoveTaskComponent } from './Tasks/move-task/move-task.component';
import { AddTaskComponent } from './Tasks/add-task/add-task.component';


@NgModule({
  declarations: [
    AppComponent,
    ListOfWorkersComponent,
    EditWorkerComponent,
    AddWorkerComponent,
    ListOfTasksComponent,
    DropDownComponent,
    EditTaskComponent,
    MoveTaskComponent,
    AddTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
