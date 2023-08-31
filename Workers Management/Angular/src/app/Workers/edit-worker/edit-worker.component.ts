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

  isEdditing : boolean = false;
  constructor(private router : ActivatedRoute,private service : WorkerServiceService, private route : Router){}

  ngOnInit(): void {
    this.id = this.router.snapshot.params["id"];
    this.worker = this.service.getWorker(this.id!);
  }

  onSubmit(form: NgForm){
    this.isEdditing = true;
    this.worker!.nr_worker = form.value.nr_worker;
    this.worker!.section = form.value.section;
    this.worker!.pion = form.value.pion;
    this.worker!.firstname = form.value.firstname;
    this.worker!.lastname = form.value.lastname;
    this.worker!.position = form.value.position;

    this.service.editWorker(this.id!,this.worker!);
    setTimeout(()=>{
      this.isEdditing = false;
      this.route.navigate(['/workers']);
    },500);

  }
}
