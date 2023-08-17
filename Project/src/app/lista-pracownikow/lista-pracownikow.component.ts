import { Component, OnInit } from '@angular/core';
import { workersServiceService } from '../pracownicy/pracownicy-service.service';
import { Worker } from '../pracownicy/workers.models';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-lista-pracownikow',
  templateUrl: './lista-pracownikow.component.html',
  styleUrls: ['./lista-pracownikow.component.css']
})
export class ListaPracownikowComponent implements OnInit{

  pracownicy : Worker[] | undefined;
  private pracSub : Subscription | undefined;
  list_of_tasks : string[] = [];

  constructor(private service : workersServiceService){}

  ngOnInit(): void {
    this.pracSub = this.service.getWorkers().subscribe((pracownicy: Worker[]) => {
      this.pracownicy = pracownicy;
    });
    this.list_of_tasks = this.service.get_list_of_tasks();
  }

  ngOnDestroy(): void {
    this.pracSub!.unsubscribe(); // Odsubskrybuj, aby zapobiec wyciekom pamięci
  }


  Delete(prac : number){
    this.service.deleteWorker(prac);
  }


}
