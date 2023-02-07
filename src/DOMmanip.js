import { Project } from "./Project";
import { Task } from "./Task";
//create/delete tabs
function createProjectTab(project) {
    const projectsTabs = document.getElementById("projectsTabs");
    const pTab = document.createElement("li");
    pTab.classList.add("projectTab");
    pTab.setAttribute('id', project.getName());
    
    const pButton = document.createElement("button");
    pButton.classList.add("project-name-nav");
    pButton.type = "button";
    pButton.innerHTML = project.getName();

    pTab.appendChild(pButton);
    projectsTabs.appendChild(pTab);
}

function createTaskTab(task) {
    
}

//form submissions
function taskFormSubmit(e) {
    e.preventDefault();
    var name = document.getElementById("tname").value;
    var ddate = document.getElementById("ddate").value;
    var descrip = document.getElementById("descrip").value;
    var priority = document.getElementById("priority").value;

    const newTask = new Task(name, ddate, descrip, priority);
    createTaskTab(newTask);
    //store task under proper project and create page
    //retrieve which project it is under - acces parent node

    /* Clear form */
    document.getElementById("tname").value = "";
    document.getElementById("ddate").value = "";
    document.getElementById("descrip").value = "";
    document.getElementById("priority").value = "";
}

function projectFormSubmit(e) {
    e.preventDefault();
    var name = document.getElementById("pname").value;
    const newProject = new Project(name);

    createProjectTab(newProject);
    //store the project and create tab on left

}


const newTaskForm = document.getElementById("newTaskForm");
const newProjectForm = document.getElementById("newProjectForm");
/* Toggle new Task Form and button visibility */
function toggleTaskForm() {
    newTaskForm.style.display = "flex";
    document.getElementById("newTaskButton").style.display = "none";
}

const eventListeners = () => {
    const newTaskButton = document.getElementById("newTaskButton");
    newTaskButton.addEventListener("click", toggleTaskForm);

    newTaskForm.onsubmit = taskFormSubmit;
    newProjectForm.onsubmit = projectFormSubmit;
}



export {eventListeners};