export class project{
    
    constructor(title, dueDate, description){
        this.title=title;
        this.dueDate=dueDate;
        this.description=description;
        this.toDos=[];
    }

    addToDo(todo){
        this.toDos.push(todo);
    }

}