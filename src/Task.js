export class Task{
    constructor(name, date=null, descrip=null, priority=null) {
        this.name = name;
        this.date = date;
        this.descrip = descrip;
        this.priority = priority;
    }

    setName(name) {
        this.name = name;
    }

    setDate(date) {
        this.date = date;
    }

    setDescrip(descrip) {
        this.descrip = descrip;
    }

    setPriority(priority) {
        this.priority = priority;
    }
};