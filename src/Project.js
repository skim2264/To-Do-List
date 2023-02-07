export class Project {
    constructor(name) {
        this.name = name;
        this.list = [];
    }

    setName(name) {
        this.name = name;
    }

    setList(list) {
        this.list = this;
    }

    getName() {
        return this.name;
    }

    getList() {
        return this.list;
    }

    getTask(taskName) {
        return this.list.find((task) => task.getName() === taskName);
    }

    addTask(newTask) {
        this.list.push(newTask);
    }

    deleteTask(taskName) {
        this.list = this.list.filter((task) => task.getName() !== taskName);
    }
}