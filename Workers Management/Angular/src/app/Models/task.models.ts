
export class Task {
    public task_content : string;
    public status : string;
    public advanced : number;
    public task_category : string;

    constructor(task_content:string,status:string= "Nie rozpoczęte",advanced:number = 0,task_category:string) {
        this.task_content = task_content;
        this.status = status;
        this.advanced = advanced;
        this.task_category = task_category;
    }
}