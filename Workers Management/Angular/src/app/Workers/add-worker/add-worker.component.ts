import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { WorkerServiceService } from 'src/app/Service/worker-service.service';
import { Router } from '@angular/router';
import { Worker } from 'src/app/Models/worker.models';

@Component({
  selector: 'app-add-worker',
  templateUrl: './add-worker.component.html',
  styleUrls: ['./add-worker.component.css']
})
export class AddWorkerComponent {
  constructor(private service : WorkerServiceService, private route : Router){}

  onSubmit(form:NgForm){
    const prac = new Worker(form.value.nr_worker,form.value.firstname,form.value.lastname,form.value.position,form.value.section,form.value.pion,[]);
    this.service.addWorker(prac);
    this.route.navigate(['']);
  }
}
