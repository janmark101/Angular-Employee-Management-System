import { Component, OnInit } from '@angular/core';
import { Worker } from 'src/app/Models/worker.models';
import { WorkerServiceService } from 'src/app/Service/worker-service.service';
import { ActivatedRoute } from '@angular/router';
import { Options } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-list-of-tasks',
  templateUrl: './list-of-tasks.component.html',
  styleUrls: ['./list-of-tasks.component.css']
})
export class ListOfTasksComponent implements OnInit{
  id_worker : number | null  | undefined;
  worker : Worker | undefined;

  value: number [] =[];
  options: Options = {
    floor: 0,
    ceil: 200
  };
  selected = "Nie rozpoczete";

  WorkerTasks : any[] = [];

  constructor(private acitvroute : ActivatedRoute,private service : WorkerServiceService){}

  newStatus : string | undefined;

  ngOnInit(): void {
    this.id_worker = this.acitvroute.snapshot.params["id"];
    this.worker = this.service.getWorker(this.id_worker!);
    this.WorkerTasks = Object.values(this.worker!?.tasks);
    
    for (let i =0 ; i < this.WorkerTasks.length; i++){
      this.value![i] = this.WorkerTasks[i].advanced;
    }


  }

  changeStatus(status:string){
    this.newStatus=status;
  }

  SaveStatus(id_task:number){
    if (this.newStatus != undefined){
      this.service.saveNewStatus(this.newStatus,id_task,this.id_worker!)
    }
    this.service.saveZaawansowanie(this.value![id_task],id_task,this.id_worker!);
  }

  DeleteTask(id_task:number){
    this.value.splice(id_task,1);
    this.service.deleteTask(id_task,this.id_worker!);
  }
}
