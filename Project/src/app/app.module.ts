import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaPracownikowComponent } from './lista-pracownikow/lista-pracownikow.component';
import { DodajPracownikaComponent } from './dodaj-pracownika/dodaj-pracownika.component';
import { EdytujPracComponent } from './edytuj-prac/edytuj-prac.component';
import { ZadaniaComponent } from './zadania/zadania.component';
import { DropDownDirective } from './drop-down.directive';
import {MatSliderModule} from '@angular/material/slider';
import { DropdownComponent } from './dropdown/dropdown.component';
import { NoweZadanieComponent } from './zadania/nowe-zadanie/nowe-zadanie.component';
import { EditTaskComponent } from './zadania/edit-task/edit-task.component';
import { MoveTaskComponent } from './zadania/move-task/move-task.component';
import { FilterPipe } from './filter.pipe';


@NgModule({
  declarations: [
    AppComponent,
    ListaPracownikowComponent,
    DodajPracownikaComponent,
    EdytujPracComponent,
    ZadaniaComponent,
    DropDownDirective,
    DropdownComponent,
    NoweZadanieComponent,
    EditTaskComponent,
    MoveTaskComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    MatSliderModule,    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
