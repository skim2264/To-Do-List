import { Project } from "./Project";

function storeProject(project) {
    let projectList = getProjectList();
    if (!projectList.includes(project.name)) {
        projectList.push(project.name);
    }
    localStorage.setItem("projects", JSON.stringify(projectList));
    localStorage.setItem(project.name, JSON.stringify(project));
}

function deleteProject(project) {
    let projectList = getProjectList();
    projectList.splice(projectList.indexOf(project.name), 1);
    localStorage.removeItem(project.name);
}

function getProject(projectName) {
    return JSON.parse(localStorage.getItem(projectName));
}

function getProjectList() {
    if (localStorage.length == 0) {
        localStorage.setItem("My List", JSON.stringify(new Project("My List")));
        localStorage.setItem("projects", JSON.stringify(["My List"]));
        return ["My List"];
    }
    return JSON.parse(localStorage.getItem("projects"));
}

export {storeProject, deleteProject, getProject, getProjectList};