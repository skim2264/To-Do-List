import { Project } from "./Project";
import { Task } from "./Task";
import { storeProject, deleteProject, getProject, getProjectList, saveTask, delTaskStorage} from "./Storage";

//create tabs based on storage
function loadPage() {
    const projectList = getProjectList();
    const projectsTabs = document.getElementById("projectsTabs");
    projectsTabs.replaceChildren();
    projectList.forEach((item) => createProjectTab(item));
}

function createProjectTab(projectName) {
    const projectsTabs = document.getElementById("projectsTabs");
    const div = document.createElement("div");
    div.classList.add("pTabDiv");
    div.innerHTML = `<li class="projectTab">
    <button type="button" class="project-name-nav nav-button">
        <div class="pTabIcon">
            <div><i class="fa-solid fa-bars"></i></div>
            <div class="pNameTab">${projectName}</div>
        </div>
        <div class="binImg"><i class="fa-solid fa-trash-can projectBin"></i></div>
    </button>
</li>`
    div.querySelector(".pTabIcon").addEventListener("click", openProject);
    div.querySelector(".binImg").addEventListener("click", deleteProjectTab);
    projectsTabs.appendChild(div);
}

function deleteProjectTab(e) {
    const projectName = e.currentTarget.parentElement.querySelector(".pNameTab").innerHTML;
    deleteProject(projectName);
    loadPage();
}

//Open project tab
function openProject(e) {
    const name = e.currentTarget.querySelector(".pNameTab").innerHTML;
    const tabContentName = document.getElementById("tabContentName");
    const project = getProject(name);
    const projectLabel = document.getElementById("projectLabel");

    if (document.getElementById("newTaskForm").style.display === "flex") {
        document.getElementById("newTaskForm").style.display = "none";
        document.getElementById("newTaskButton").disabled = false;
    }
    
    projectLabel.value = name;
    tabContentName.innerHTML = name;
    loadProject(project);
}

function loadProject(project) {
    if (!document.getElementById("taskButtonDiv")) {
        const tabContent = document.getElementById("tabContent");
        const taskButtonDiv = document.createElement("div");
        taskButtonDiv.id = "taskButtonDiv";
        taskButtonDiv.innerHTML = `<button type="button" id="newTaskButton" class="button-4">+ Create a New Task</button>`;
        tabContent.after(taskButtonDiv);
        const newTaskButton = document.getElementById("newTaskButton");
        newTaskButton.onclick = toggleTaskForm;
    }

    const tabContentList = document.getElementById("tabContentList");
    tabContentList.replaceChildren();
    if (project._list.length != 0) {
        project._list.forEach((item) => {
            const div = document.createElement("div");
            if (item._done == true) {
                div.innerHTML = `<li class="listItem">
                    <div class="left">
                        <div class="checkbox"><i class="fa-regular fa-square-check"></i></div>
                        <div class="listItemName">${item._name}</div>
                    </div>
                    <div class="right">
                        <div class="listItemDate">${item._date}</div>
                        <div class="itemX"><i class="fa-solid fa-xmark"></i></div>
                    </div>
                    <div hidden>${project._name}</div>
                </li>`
            } else {
                div.innerHTML = `<li class="listItem">
                <div class="left">
                    <div class="checkbox"><i class="fa-regular fa-square"></i></div>
                    <div class="listItemName">${item._name}</div>
                </div>
                <div class="right">
                    <div class="listItemDate">${item._date}</div>
                    <div class="itemX"><i class="fa-solid fa-xmark"></i></div>
                </div>
                <div hidden>${project._name}</div>
                </li>`
            }
            
            div.querySelector(".checkbox").addEventListener("click", function(e) {
                toggleCheckBox(item,e);
            });
            div.querySelector(".listItemName").addEventListener("click", openDescription);
            div.querySelector(".itemX").addEventListener("click", function(e) {
                deleteTask(item, e);
            });
            tabContentList.appendChild(div);
    
        })
    }
}

//delete task
function deleteTask(task, e) {
    e.currentTarget.parentElement.parentElement.remove();
    delTaskStorage(task);
}

//Open Description
function openDescription(e) {
    const projectName = e.currentTarget.parentElement.parentElement.lastElementChild.innerHTML;
    const project = getProject(projectName);
    const itemName = e.currentTarget.innerHTML;
    //find task in project list
    const task = project._list.find((task) => task._name == itemName);
    const descrip = task._descrip;
    const div = document.createElement("div");

    if (e.currentTarget.classList.contains("descripOpen")) {
        e.currentTarget.classList.replace("descripOpen", "descripClosed");
        e.currentTarget.parentElement.parentElement.nextSibling.remove();
    } else {
        div.classList.add("descripDiv");
        div.innerHTML = `${descrip}`;
        e.currentTarget.parentElement.parentElement.after(div);

        if (e.currentTarget.classList.contains("descripClosed")) {
            e.currentTarget.classList.replace("descripClosed", "descripOpen");
        } else {
            e.currentTarget.classList.add("descripOpen");
        }
    }

}

//form submissions
function taskFormSubmit(e) {
    e.preventDefault();
    var name = document.getElementById("tname").value;
    var ddate = document.getElementById("ddate").value;
    var descrip = document.getElementById("descrip").value;
    var projectName = document.getElementById("projectLabel").value;

    const newTask = new Task(name, ddate, descrip, false, projectName);
    const project = getProject(projectName);
    project._list.push(newTask);
    storeProject(project);
    
    /* Clear form */
    document.getElementById("tname").value = "";
    document.getElementById("ddate").value = "";
    document.getElementById("descrip").value = "";
    toggleTaskForm();
    loadProject(project);
}

function projectFormSubmit(e) {
    e.preventDefault();
    var name = document.getElementById("pname").value;
    const newProject = new Project(name);

    createProjectTab(name);
    storeProject(newProject);
    
    document.getElementById("pname").value = "";
}


const newTaskForm = document.getElementById("newTaskForm");
const newProjectForm = document.getElementById("newProjectForm");
/* Toggle new Task Form and button visibility */
function toggleTaskForm() {
    if (newTaskForm.style.display === "none") {
        newTaskForm.style.display = "flex";
        document.getElementById("newTaskButton").disabled = true;
    } else {
        newTaskForm.style.display = "none";
        document.getElementById("newTaskButton").disabled = false;
    }
}

function toggleCheckBox(task,e) {
    if (e.currentTarget.querySelector('.fa-square') != null) {
        e.currentTarget.replaceChildren();
        e.currentTarget.innerHTML = `<i class="fa-regular fa-square-check"></i>`;
        task._done = true;
        saveTask(task);
    } else {
        e.currentTarget.replaceChildren();
        e.currentTarget.innerHTML = `<i class="fa-regular fa-square"></i>`;
        task._done = false;
        saveTask(task);
    }
    
}


const eventListeners = () => {
    //toggle task form visibility
    const cancelButton = document.getElementById("cancelButton");
    cancelButton.onclick = toggleTaskForm;

    //submit forms 
    newTaskForm.onsubmit = taskFormSubmit;
    newProjectForm.onsubmit = projectFormSubmit;
}



export {eventListeners, loadPage};