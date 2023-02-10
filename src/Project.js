export class Project {
    constructor(name, list=[]) {
        this.name = name;
        this.list = list;
    }

    set name(newName) {
        this._name = newName;
    }

    set list(newList) {
        this._list = newList;
    }

    get name() {
        return this._name;
    }

    get list() {
        return this._list;
    }

    //manually use these functions
   /*  getTask(taskName) {
        return this.list.find((task) => {task.name === taskName});
    }

    addTask(newTask) {
        this.list.push(newTask);
    }

    deleteTask(taskName) {
        this.list = this.list.filter((task) => {task.name !== taskName});
    } */
}