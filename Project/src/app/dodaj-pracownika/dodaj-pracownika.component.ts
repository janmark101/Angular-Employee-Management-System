import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { workersServiceService } from '../pracownicy/pracownicy-service.service';
import { Worker } from '../pracownicy/workers.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dodaj-pracownika',
  templateUrl: './dodaj-pracownika.component.html',
  styleUrls: ['./dodaj-pracownika.component.css']
})
export class DodajPracownikaComponent {

  constructor(private service : workersServiceService, private route : Router){}

  onSubmit(form:NgForm){
    const prac = new Worker(form.value.nr_prac,form.value.imie,form.value.nazwisko,form.value.stanowisko,form.value.dzial,form.value.pion,[]);
    this.service.addWorker(prac);
    this.route.navigate(['']);
  }
}
