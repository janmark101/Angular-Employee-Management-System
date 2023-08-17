
export class Task {
    public tresc_zadania : string;
    public status : string;
    public zaawansowanie : number;
    public kategeoria_zadania : string;

    constructor(tresc_zadania:string,status:string= "Nie rozpoczęte",zaawansowanie:number = 0,kategeoria_zadania:string) {
        this.tresc_zadania = tresc_zadania;
        this.status = status;
        this.zaawansowanie = zaawansowanie;
        this.kategeoria_zadania = kategeoria_zadania;
    }
}