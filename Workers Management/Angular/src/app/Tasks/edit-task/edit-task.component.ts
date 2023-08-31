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
  Category : string[]| undefined;
  selectedCategory : string | undefined;
  defaultSliderValue : number | undefined;
  newStatusTask : string | undefined;

  UserTask : any[] = [];
  isEdditing : boolean = false;
  constructor( private Activeroute: ActivatedRoute, private service : WorkerServiceService, private route : Router){};

  ngOnInit(): void {
    this.id_worker = this.Activeroute.snapshot.params['id'];
    this.worker = this.service.getWorker(this.id_worker!);
    console.log(this.service.getWorker(this.id_worker!));
    
    // this.id_task = this.Activeroute.snapshot.params['idTask'];
 
    // this.CategorySub = this.service.getCategory().subscribe((data: string[]) => {
    //   this.Category = data;
    // });
    // this.selectedCategory  = this.worker!.tasks[this.id_task!].task_category;
    // this.defaultSliderValue = this.worker!.tasks[this.id_task!].advanced;
  }

  ngOnDestroy(): void {
    this.CategorySub!.unsubscribe(); 
  }

  
  
  onSubmit(form : NgForm){
    this.isEdditing = true;
    // console.log(this.newStatusTask);
    // if (this.newStatusTask === undefined){
    //   const task : Task = new Task(form.value.task_content,this.worker!.tasks[this.id_task!].status,this.defaultSliderValue,this.selectedCategory!);
    //   this.service.editTask(task,this.id_worker!,this.id_task!);
    // this.route.navigate(['/workers',this.id_worker,'tasks']);
    // }
    // else{
    //   const task : Task = new Task(form.value.task_content,this.newStatusTask,this.defaultSliderValue,this.selectedCategory!);
    //   this.service.editTask(task,this.id_worker!,this.id_task!);
    // this.route.navigate(['/workers',this.id_worker,'tasks']);
    // }

    setTimeout(()=>{
      this.isEdditing = false;
      this.route.navigate(['/workers',this.id_worker,'tasks']);
    },500);
  
  }

  newStatus(status:string){
    this.newStatusTask = status;
  }
}
