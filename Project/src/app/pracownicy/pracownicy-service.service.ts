import { Injectable } from '@angular/core';
import { Worker } from './workers.models';
import { BehaviorSubject, Observable,of } from 'rxjs';
import { Task } from './task.models';

@Injectable({
  providedIn: 'root'
})
export class workersServiceService {

  private workers: Worker[] = [new Worker(1234,"Jan","Kowalski","Analityk biznesowy","RIW","DT",[new Task("Tworzenie makiet","Nie rozpoczęte",0,"Rozwój aplikacji"),
  new Task("Rozwiązywanie zadań","W realizacji",25,"Rozwój aplikacji")]),
  new Worker(13321,"Tomasz","Nowak","Programista","RIW","DT",[new Task("Analizowanie Zadań","Zakończone",25,"Budowa aplikacji")]),
]

  private workersSubject: BehaviorSubject<Worker[]> = new BehaviorSubject<Worker[]>(this.workers);
  private Category : string[] = ["Budowa aplikacji","Rozwój aplikacji"];

  private CategorySubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(this.Category);

  constructor() { }

  getWorkers(): Observable<Worker[]>{
    return this.workersSubject.asObservable();
  }

  addWorker(worker:Worker){
    this.workers.push(worker);
    this.workersSubject.next([...this.workers]);
  }

  deleteWorker(id_worker:number){
      this.workers.splice(id_worker, 1);
      this.workersSubject.next([...this.workers]);
  }

  editWorker(id_worker:number, worker:Worker){
    this.workers[id_worker] = worker;
    this.workersSubject.next([...this.workers]);
  }

  getWorker(id_worker : number) {
    return this.workers[id_worker];
  }

  getCategory(): Observable<string[]>{
    return this.CategorySubject.asObservable();
  }

  addCategory(category:string){
    this.Category.push(category);
    this.CategorySubject.next([...this.Category]);
  }

  addTaskWorker(task:Task,id_worker:number){
      this.workers[id_worker].zadania.push(task);
      this.workersSubject.next([...this.workers]);
  }

  saveNewStatus(status:string,id_Task:number,id_worker:number){
    this.workers[id_worker].zadania[id_Task].status = status;
    this.workersSubject.next([...this.workers]);
  }

  saveZaawansowanie(value:number,id_Task:number,id_worker:number){
    this.workers[id_worker].zadania[id_Task].zaawansowanie=value;
    this.workersSubject.next([...this.workers]);
  }

  deleteTask(id_Task:number,id_worker:number){
    this.workers[id_worker].zadania.splice(id_Task,1);
    this.workersSubject.next([...this.workers]);
  }

  editTask(task:Task,id_worker:number,id_task:number){
    this.workers[id_worker].zadania[id_task] = task;
    this.workersSubject.next([...this.workers]);
  }

  MoveTask(id_worker : number,id_task:number,status:string,new_task_worker: Worker){
    this.workers[id_worker].zadania[id_task].status = status;
    const Task = this.workers[id_worker].zadania[id_task];
    const new_task_worker_id = this.workers.indexOf(new_task_worker);
    this.deleteTask(id_task,id_worker);
    this.addTaskWorker(Task,new_task_worker_id);
  }

  get_list_of_tasks(){
    let list_of_task = [];
    let Tasks_for_one_worker :number  = 0;
    let Task_done_for_one_worker : number = 0;

    for(let i =0; i<this.workers.length;i++){
      for (let j =0; j< this.workers[i].zadania.length;j++){
        Tasks_for_one_worker ++;
        console.log(Tasks_for_one_worker);
        if (this.workers[i].zadania[j].status === "Zakończone"){
          Task_done_for_one_worker ++;
        }
      }
      list_of_task.push('['+Task_done_for_one_worker+'/'+Tasks_for_one_worker+']');
      Tasks_for_one_worker = 0;
      Task_done_for_one_worker=0;
    }
    
    console.log(list_of_task);
    return list_of_task;
  }
}
