import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { WorkerServiceService } from 'src/app/Service/worker-service.service';
import { Worker } from 'src/app/Models/worker.models';

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
    this.WorkersSub = this.service.getWorkers().subscribe((data: Worker[]) => {
      this.Workers = data;
    });
  }

  ngOnDestroy(): void {
    this.WorkersSub!.unsubscribe(); 
  }

  ApproveMove(){
    this.service.MoveTask(this.activroute.snapshot.params['id'],this.activroute.snapshot.params['idTask'],this.Status!,this.new_task_worker!);
    this.route.navigate(['/worker',this.activroute.snapshot.params['id'],'tasks']);
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
