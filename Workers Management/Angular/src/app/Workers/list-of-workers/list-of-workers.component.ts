import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Worker } from 'src/app/Models/worker.models';
import { WorkerServiceService } from 'src/app/Service/worker-service.service';

@Component({
  selector: 'app-list-of-workers',
  templateUrl: './list-of-workers.component.html',
  styleUrls: ['./list-of-workers.component.css']
})
export class ListOfWorkersComponent implements OnInit{
  workers : Worker[] = [];
  private workersSub : Subscription | undefined;
  list_of_tasks : string[] = [];

  constructor(private service : WorkerServiceService,private router:Router){}

  ngOnInit(): void {
    this.workersSub = this.service.getWorkers().subscribe((data: Worker[]) => {           
      this.workers = data;
    });

  }

  ngOnDestroy(): void {
    this.workersSub!.unsubscribe(); 
  }


  Delete(prac : number){
    this.service.deleteWorker(prac).subscribe((data:any[])=>{
      this.workers = data;
    },(error:any)=>{
      console.error(error);
      
    });
  }

  DelayNavigation(i:number){
    setTimeout(()=>{
      this.router.navigate(['workers/',i,'tasks'])
    },300);
  }
}
