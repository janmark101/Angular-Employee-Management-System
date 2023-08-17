import { Task } from "./task.models";

export class Worker {
    public nr_worker : number;
    public firstname : string;
    public lastname: string;    
    public position: string;
    public section : string;
    public pion : string;
    public zadania : Task[];


    constructor(nr_worker:number,firstname:string,lastname:string, position : string,section: string,pion:string,zadanie:Task[]) {
        this.nr_worker = nr_worker;
        this.firstname= firstname;
        this.lastname = lastname;
        this.position = position;
        this.section = section;
        this.pion = pion;
        this.zadania = zadanie;
    }
}