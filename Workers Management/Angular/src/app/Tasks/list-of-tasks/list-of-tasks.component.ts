import { Component, OnInit } from '@angular/core';
import { Worker } from 'src/app/Models/worker.models';
import { WorkerServiceService } from 'src/app/Service/worker-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Options } from '@angular-slider/ngx-slider';
import { Task } from 'src/app/Models/task.models';

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

  constructor(private acitvroute : ActivatedRoute,private service : WorkerServiceService,private router:Router){}

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
    const newTask = new Task(this.WorkerTasks[id_task].task_content,this.newStatus,this.value![id_task],this.WorkerTasks[id_task].category)
    this.service.UpdateTask(newTask,this.id_worker!,id_task);
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
