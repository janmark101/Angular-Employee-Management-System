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
  Category : { name: string }[]| undefined;
  selectedOption: string |undefined ;
  add_category = false;

  isAdding : boolean = false;
  Message : any;

  ngOnInit(): void {
    this.id = this.acitvroute.snapshot.params["id"];
    this.CategorySub = this.service.getCategory().subscribe((data: any) => {
      this.Category = Object.values(data);
    });
  }

  ngOnDestroy(): void {
    this.CategorySub!.unsubscribe(); 
  }

  onSubmit(form: NgForm){
    if (this.add_category === true){
      if (form.valid){
        this.Category?.push({name: form.value.category_name});
        this.service.addCategory(form.value.category_name);
        this.add_category = !this.add_category
      }
      else{
        this.Message = "Dont leave any empty fields!";
      }
    }
    else{
      if (form.valid) {
        this.isAdding = true;
    const newTask = new Task(form.value.task_content,"Nie rozpoczęte",0,this.selectedOption!);
    
    this.service.addTaskWorker(newTask,this.id!);

    setTimeout(()=>{
      this.isAdding = false;
      this.route.navigate(['workers',this.id,'tasks']);
    },1200);
      }
      else{
        this.Message = "Dont leave any empty fields!";
      }
    }
  }

  CategoryFunc(){
    this.add_category = !this.add_category;
  }
}
