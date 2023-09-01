import { Component, OnInit } from '@angular/core';
import { Worker } from 'src/app/Models/worker.models';
import { WorkerServiceService } from 'src/app/Service/worker-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Options } from '@angular-slider/ngx-slider';
import { Task } from 'src/app/Models/task.models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-of-tasks',
  templateUrl: './list-of-tasks.component.html',
  styleUrls: ['./list-of-tasks.component.css']
})
export class ListOfTasksComponent implements OnInit{
  id_worker : number | undefined;
  worker : Worker[] = [];
  workerSub : Subscription | undefined;

  value: number [] =[];
  options: Options = {
    floor: 0,
    ceil: 200
  };
  selected = "Nie rozpoczete";

  WorkerTasks : any[] = [];


  constructor(private acitvroute : ActivatedRoute,private service : WorkerServiceService,private router:Router){}

  newStatus : string | undefined;

  ngOnInit(): void {
    this.workerSub = this.service.getWorkers().subscribe((data:any[])=>{this.worker=data;})
    this.id_worker = this.acitvroute.snapshot.params["id"];  

    setTimeout(()=>{
  
    if ((!!this.id_worker) && (this.worker[this.id_worker!].tasks != undefined )){
        this.WorkerTasks = Object.values((this.worker)[this.id_worker!].tasks);

    
    for (let i =0 ; i < this.WorkerTasks.length; i++){
      this.value![i] = this.WorkerTasks[i].advanced;
    }
  }
  },100);

  }

  ngOnDestroy(): void {
    this.workerSub!.unsubscribe(); 
  }

  changeStatus(status:string){
    this.newStatus=status;
  }

  SaveStatus(id_task:number){
    this.WorkerTasks[id_task].task_content = this.WorkerTasks[id_task].task_content;
    this.WorkerTasks[id_task].status = this.newStatus;
    this.WorkerTasks[id_task].advanced = this.value![id_task];
    this.WorkerTasks[id_task].task_category = this.WorkerTasks[id_task].task_category

    this.service.UpdateTask(this.WorkerTasks[id_task],this.id_worker!,id_task);
  }

  DeleteTask(id_task:number){
    this.WorkerTasks.splice(id_task,1);
    this.service.deleteTask(id_task,this.id_worker!);
  }

  DelayChange(i:number,route:string){
    setTimeout(()=>{
      this.router.navigate(['workers/',this.id_worker,'tasks',i,`${route}`])
    },300);
  }
}
