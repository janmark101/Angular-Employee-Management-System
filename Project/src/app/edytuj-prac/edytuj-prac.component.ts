import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { workersServiceService } from '../pracownicy/pracownicy-service.service';
import { Worker } from '../pracownicy/workers.models';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edytuj-prac',
  templateUrl: './edytuj-prac.component.html',
  styleUrls: ['./edytuj-prac.component.css']
})
export class EdytujPracComponent implements OnInit{

  id : number | null  | undefined;
  pracownik : Worker | undefined;

  constructor(private router : ActivatedRoute,private service : workersServiceService, private route : Router){}

  ngOnInit(): void {
    this.id = this.router.snapshot.params["id"];
    console.log(this.id);
    this.pracownik = this.service.getWorker(this.id!);
    console.log(this.pracownik);
  }

  onSubmit(form: NgForm){
    this.pracownik!.nr_worker = form.value.nr_worker;
    this.pracownik!.section = form.value.section;
    this.pracownik!.pion = form.value.pion;
    this.pracownik!.firstname = form.value.firstname;
    this.pracownik!.lastname = form.value.lastname;
    this.pracownik!.position = form.value.position;

    this.service.editWorker(this.id!,this.pracownik!);
    this.route.navigate(['']);
  }
}
