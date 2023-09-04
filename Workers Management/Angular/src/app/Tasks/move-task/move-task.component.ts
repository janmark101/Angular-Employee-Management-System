import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { WorkerServiceService } from 'src/app/Service/worker-service.service';
import { Worker } from 'src/app/Models/worker.models';
import { Task } from 'src/app/Models/task.models';

@Component({
  selector: 'app-move-task',
  templateUrl: './move-task.component.html',
  styleUrls: ['./move-task.component.css']
})
export class MoveTaskComponent {
  choosenWorker : string | undefined;
  list_of_workers_search :Worker[] = [];
  Workers : Worker[] = []
  private WorkersSub : Subscription | undefined;
  filteredWorker:string ='';
  id_choosen_worker : number | undefined;
  new_task_worker : Worker | undefined;
  Status : string | undefined;

  Message : any;
  UserTasks :any;
  worker :any;
  id_task : any;

  ChooseWorker(worker:Worker,id:number){
    this.id_choosen_worker = id;
    this.new_task_worker = this.list_of_workers_search[id];
    this.choosenWorker = this.list_of_workers_search[id].firstname +' '+ this.list_of_workers_search[id].lastname;    
  }

  Search_workers(){
    this.list_of_workers_search = this.transform(this.Workers,this.filteredWorker);
  }

  constructor(private service : WorkerServiceService, private activroute : ActivatedRoute,private route : Router){}


  ngOnInit(): void {
    this.WorkersSub = this.service.getWorkers().subscribe((data: any[]) => {
      this.Workers = data;
      this.worker = this.service.getWorker(this.activroute.snapshot.params['id']);
      
      
    });
    this.id_task = this.activroute.snapshot.params['idTask'];
    this.UserTasks = Object.values(this.worker!.tasks);
    this.Status = this.UserTasks[this.id_task].status;
  }

  ngOnDestroy(): void {
    this.WorkersSub!.unsubscribe(); 
  }

  ApproveMove(){
    if (this.choosenWorker !== undefined){
      if (this.Status !== undefined){
        const task = new Task(this.UserTasks[this.id_task].task_content,this.Status,this.UserTasks[this.id_task].advanced,this.UserTasks[this.id_task].task_category);
        
//        const task = Object.values(this.worker!.tasks)[this.activroute.snapshot.params['idTask']];        
        this.service.MoveTask(this.activroute.snapshot.params['id'],this.id_task,this.new_task_worker!,task);
        this.route.navigate(['/workers',this.activroute.snapshot.params['id'],'tasks']);
      }
      else {
        this.Message = 'Choose status!';
      }
    }
    else {
      this.Message = "Choose worker!";
    }

  }

  chooseStatus(status:string){
    this.Status = status;
  }

  transform(value: any, filterString:string): any {
    if (value.length ===0 ){
      return value;
    }
    const resultArray = [];
    for (const item of value) {
      if (item.lastname.toUpperCase().includes(filterString.toUpperCase())){
        resultArray.push(item);
      }
      
    }
    return resultArray;
  }
}
