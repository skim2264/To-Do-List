export class Task{
    constructor(name, date, descrip, priority) {
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

    getName() {
        return this.name;
    }

    getDate() {
        return this.date;
    }

    getdescrip() {
        return this.descrip;
    }

    getPriority() {
        return this.priority;
    }
};