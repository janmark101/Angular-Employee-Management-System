import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Task } from 'src/app/Models/task.models';
import { WorkerServiceService } from 'src/app/Service/worker-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit{
  constructor(private service : WorkerServiceService,private acitvroute : ActivatedRoute,private route: Router){}

  id : number | null  | undefined;
  private CategorySub : Subscription | undefined;
  Category : string[]| undefined;
  selectedOption: string |undefined ;
  add_category = false;

  ngOnInit(): void {
    this.id = this.acitvroute.snapshot.params["id"];
    this.CategorySub = this.service.getCategory().subscribe((data: string[]) => {
      this.Category = data;
    });
  }

  ngOnDestroy(): void {
    this.CategorySub!.unsubscribe(); 
  }

  onSubmit(form: NgForm){
    if (this.add_category === true){
      this.service.addCategory(form.value.category_name);
      this.add_category = !this.add_category
    }
    else{
    const newTask = new Task(form.value.task_content,"Nie rozpoczęte",0,this.selectedOption!);
    this.service.addTaskWorker(newTask,this.id!);
    this.route.navigate(['/worker',this.id,'tasks'])
    }
  }

  CategoryFunc(){
    this.add_category = !this.add_category;
  }
}
