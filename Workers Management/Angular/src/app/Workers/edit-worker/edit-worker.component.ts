import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkerServiceService } from 'src/app/Service/worker-service.service';
import { Worker } from 'src/app/Models/worker.models';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-worker',
  templateUrl: './edit-worker.component.html',
  styleUrls: ['./edit-worker.component.css']
})
export class EditWorkerComponent implements OnInit{
  id : number | null  | undefined;
  worker : Worker | undefined;

  constructor(private router : ActivatedRoute,private service : WorkerServiceService, private route : Router){}

  ngOnInit(): void {
    this.id = this.router.snapshot.params["id"];
    console.log(this.id);
    this.worker = this.service.getWorker(this.id!);
    console.log(this.worker);
  }

  onSubmit(form: NgForm){
    this.worker!.nr_worker = form.value.nr_worker;
    this.worker!.section = form.value.section;
    this.worker!.pion = form.value.pion;
    this.worker!.firstname = form.value.firstname;
    this.worker!.lastname = form.value.lastname;
    this.worker!.position = form.value.position;

    this.service.editWorker(this.id!,this.worker!);
    this.route.navigate(['']);
  }
}
