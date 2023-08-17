import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { workersServiceService } from 'src/app/pracownicy/pracownicy-service.service';
import { Worker } from 'src/app/pracownicy/workers.models';
import { FilterPipe } from 'src/app/filter.pipe';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-move-task',
  templateUrl: './move-task.component.html',
  styleUrls: ['./move-task.component.css'],
  providers : [FilterPipe]
})
export class MoveTaskComponent implements OnInit{
  choosenWorker : string | undefined;
  list_of_workers_search :Worker[] = [];
  Workers : Worker[] = []
  private pracSub : Subscription | undefined;
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
    this.list_of_workers_search = this.pipe.transform(this.Workers,this.filteredWorker);
  }

  constructor(private service : workersServiceService, private pipe : FilterPipe,private activroute : ActivatedRoute,private route : Router){}


  ngOnInit(): void {
    this.pracSub = this.service.getWorkers().subscribe((pracownicy: Worker[]) => {
      this.Workers = pracownicy;
    });
  }

  ngOnDestroy(): void {
    this.pracSub!.unsubscribe(); // Odsubskrybuj, aby zapobiec wyciekom pamięci
  }

  ApproveMove(){
    this.service.MoveTask(this.activroute.snapshot.params['id'],this.activroute.snapshot.params['idTask'],this.Status!,this.new_task_worker!);
    this.route.navigate(['/user',this.activroute.snapshot.params['id'],'zadania']);
  }

  chooseStatus(status:string){
    this.Status = status;
  }
}
