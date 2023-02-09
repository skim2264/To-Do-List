export class Project {
    constructor(name) {
        this.name = name;
        this.list = [];
    }

    setName(name) {
        this.name = name;
    }

    setList(list) {
        this.list = list;
    }

    getTask(taskName) {
        return this.list.find((task) => {task.getName() === taskName});
    }

    //manually use these functions
    addTask(newTask) {
        this.list.push(newTask);
    }

    deleteTask(taskName) {
        this.list = this.list.filter((task) => {task.getName() !== taskName});
    }
}