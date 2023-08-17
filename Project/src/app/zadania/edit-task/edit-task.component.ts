import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { workersServiceService } from 'src/app/pracownicy/pracownicy-service.service';
import { Worker } from 'src/app/pracownicy/workers.models';
import { Task } from 'src/app/pracownicy/task.models';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit{

  id_task : number | undefined;
  id_worker : number | undefined;
  worker : Worker | undefined;
  private KatSub : Subscription | undefined;
  kategorie : string[]| undefined;
  selectedCategory : string | undefined;
  defaultSliderValue : number | undefined;
  newStatusTask : string | undefined;
  constructor( private Activeroute: ActivatedRoute, private service : workersServiceService, private route : Router){};

  ngOnInit(): void {
    this.id_task = this.Activeroute.snapshot.params['idTask'];
    this.id_worker = this.Activeroute.snapshot.params['id'];
    this.worker = this.service.getWorker(this.id_worker!);
    this.KatSub = this.service.getCategory().subscribe((kategorie: string[]) => {
      this.kategorie = kategorie;
    });
    this.selectedCategory  = this.worker!.zadania[this.id_task!].kategeoria_zadania;
    this.defaultSliderValue = this.worker!.zadania[this.id_task!].zaawansowanie;
  }

  ngOnDestroy(): void {
    this.KatSub!.unsubscribe(); // Odsubskrybuj, aby zapobiec wyciekom pamięci
  }

  
  
  onSubmit(form : NgForm){
    console.log(this.newStatusTask);
    if (this.newStatusTask === undefined){
      const task : Task = new Task(form.value.tresc_zadania,this.worker!.zadania[this.id_task!].status,this.defaultSliderValue,this.selectedCategory!);
      this.service.editTask(task,this.id_worker!,this.id_task!);
    this.route.navigate(['/user',this.id_worker,'zadania']);
    }
    else{
      const task : Task = new Task(form.value.tresc_zadania,this.newStatusTask,this.defaultSliderValue,this.selectedCategory!);
      this.service.editTask(task,this.id_worker!,this.id_task!);
    this.route.navigate(['/user',this.id_worker,'zadania']);
    }
  
  }

  newStatus(status:string){
    this.newStatusTask = status;
  }
}
