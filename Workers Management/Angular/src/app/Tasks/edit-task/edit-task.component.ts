import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/Models/task.models';
import { Worker } from 'src/app/Models/worker.models';
import { WorkerServiceService } from 'src/app/Service/worker-service.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit{
  id_task : number | undefined;
  id_worker : number | undefined;
  worker : Worker | undefined;
  private CategorySub : Subscription | undefined;
  Category : { name: string }[]| undefined;
  selectedCategory : string | undefined;
  defaultSliderValue : number | undefined;
  newStatusTask : string | undefined;

  UserTasks : Task |any;
  isEdditing : boolean = false;
  constructor( private Activeroute: ActivatedRoute, private service : WorkerServiceService, private route : Router){};

  ngOnInit(): void {
    this.id_worker = this.Activeroute.snapshot.params['id'];
    this.id_task = this.Activeroute.snapshot.params['idTask'];
    if ((!!this.id_worker) && (!!this.id_task)){
      this.worker = this.service.getWorker(this.id_worker!);
      this.UserTasks = Object.values(this.worker!.tasks); 
      this.selectedCategory  = this.UserTasks[this.id_task!].task_category;
      this.defaultSliderValue = this.UserTasks[this.id_task!].advanced;
      this.newStatusTask = this.UserTasks[this.id_task!].status;
    }
 
    this.CategorySub = this.service.getCategory().subscribe((data: any) => {
      this.Category = Object.values(data);
      console.log(this.Category);
      
    });

  }

  ngOnDestroy(): void {
    this.CategorySub!.unsubscribe(); 
  }

  
  
  onSubmit(form : NgForm){
    this.isEdditing = true;

    console.log(form.value.selectedOption);
    
      this.UserTasks[this.id_task!].task_content = form.value.task_content;
      this.UserTasks[this.id_task!].status = this.newStatusTask!;
      this.UserTasks[this.id_task!].advanced = this.defaultSliderValue!;
      this.UserTasks[this.id_task!].task_category = this.selectedCategory!;

      this.service.editTask(this.UserTasks[this.id_task!],this.id_worker!,this.id_task!);    

      setTimeout(()=>{
        this.isEdditing = false;
        this.route.navigate(['/workers',this.id_worker,'tasks']);
        
      },500);
  
  }

  newStatus(status:string){
    this.newStatusTask = status;
  }
}
