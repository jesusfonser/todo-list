export class toDo{
    
    constructor(title="Sin título", description="Sin descripción", dueDate="Sin fecha de finalización",
         priority="Sin prioridad", notes="Sin notas"){
        this.title=title;
        this.description=description;
        this.dueDate=dueDate;
        this.priority=priority;
        this.notes=notes;
        this.done=false;
    }
};