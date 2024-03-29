import { Project } from "./Project";

function storeProject(project) {
    let projectList = getProjectList();
    if (!projectList.includes(project.name)) {
        projectList.push(project.name);
    }
    projectList = projectList.filter(n => n);
    localStorage.setItem("projects", JSON.stringify(projectList));
    localStorage.setItem(project._name, JSON.stringify(project));
}

function deleteProject(projectName) {
    let projectList = getProjectList();
    projectList.splice(projectList.indexOf(projectName), 1);
    projectList = projectList.filter(n => n);
    localStorage.setItem("projects", JSON.stringify(projectList));
    localStorage.removeItem(projectName);
}

function getProject(projectName) {
    return JSON.parse(localStorage.getItem(projectName));
}

function getProjectList() {
    if (localStorage.length == 0) {
        localStorage.setItem("My List", JSON.stringify(new Project("My List")));
        localStorage.setItem("Today", JSON.stringify(new Project("Today")));
        localStorage.setItem("This Week", JSON.stringify(new Project("This Week")));
        localStorage.setItem("projects", JSON.stringify(["Today", "This Week", "My List"]));
        return ["Today", "This Week", "My List"];
    }
    return JSON.parse(localStorage.getItem("projects"));
}

function saveTask(task) {
    let project = getProject(task._pName);
    let index = project._list.map(function(e) {return e._name;}).indexOf(task._name);
    project._list[index] = task;
    storeProject(project);
}

function delTaskStorage(task) {
    let project = getProject(task._pName);
    let index = project._list.map(function(e) {return e._name;}).indexOf(task._name);
    project._list.splice(index, 1);
    storeProject(project);
}

export {storeProject, deleteProject, getProject, getProjectList, saveTask, delTaskStorage};