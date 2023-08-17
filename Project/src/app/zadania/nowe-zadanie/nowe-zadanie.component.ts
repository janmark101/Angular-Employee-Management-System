import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { workersServiceService } from 'src/app/pracownicy/pracownicy-service.service';
import { Task } from 'src/app/pracownicy/task.models';

@Component({
  selector: 'app-nowe-zadanie',
  templateUrl: './nowe-zadanie.component.html',
  styleUrls: ['./nowe-zadanie.component.css']
})
export class NoweZadanieComponent implements OnInit{

  constructor(private service : workersServiceService,private acitvroute : ActivatedRoute,private route: Router){}

  id : number | null  | undefined;
  private KatSub : Subscription | undefined;
  kategorie : string[]| undefined;
  selectedOption: string |undefined ;
  add_category = false;

  ngOnInit(): void {
    this.id = this.acitvroute.snapshot.params["id"];
    this.KatSub = this.service.getCategory().subscribe((kategorie: string[]) => {
      this.kategorie = kategorie;
    });
  }

  ngOnDestroy(): void {
    this.KatSub!.unsubscribe(); // Odsubskrybuj, aby zapobiec wyciekom pamięci
  }

  onSubmit(form: NgForm){
    if (this.add_category === true){
      this.service.addCategory(form.value.nazwa_kategori);
      this.add_category = !this.add_category
    }
    else{
    const zadanie = new Task(form.value.tresc_zadania,"Nie rozpoczęte",0,this.selectedOption!);
    this.service.addTaskWorker(zadanie,this.id!);
    this.route.navigate(['/user',this.id,'zadania'])
    }
  }

  CategoryFunc(){
    this.add_category = !this.add_category;
  }
}
