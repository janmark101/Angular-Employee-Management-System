import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Worker } from 'src/app/Models/worker.models';
import { WorkerServiceService } from 'src/app/Service/worker-service.service';

@Component({
  selector: 'app-list-of-workers',
  templateUrl: './list-of-workers.component.html',
  styleUrls: ['./list-of-workers.component.css']
})
export class ListOfWorkersComponent implements OnInit{
  workers : Worker[] | undefined;
  private workersSub : Subscription | undefined;
  list_of_tasks : string[] = [];

  constructor(private service : WorkerServiceService){}

  ngOnInit(): void {
    this.workersSub = this.service.getWorkers().subscribe((data: Worker[]) => {
      this.workers = data;
    });
    this.list_of_tasks = this.service.get_list_of_tasks();
  }

  ngOnDestroy(): void {
    this.workersSub!.unsubscribe(); 
  }


  Delete(prac : number){
    this.service.deleteWorker(prac);
  }
}
