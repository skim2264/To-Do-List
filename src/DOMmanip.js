import { Project } from "./Project";
import { Task } from "./Task";
import { storeProject, deleteProject, getProject, getProjectList} from "./Storage";

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
    div.innerHTML = `<li class="projectTab">
    <button type="button" class="project-name-nav">
        <div class="pNameTab">${projectName}</div>
        <div class="binImg"><i class="fa-solid fa-trash-can projectBin"></i></div>
    </button>
</li>`
    projectsTabs.appendChild(div);
}

function deleteProjectTab(projectName) {
    deleteProject(projectName);
    loadPage();
}

//Open project tab
function openProject(e) {
    const name = e.target.innerHTML;
    const tabContentName = document.getElementById("tabContentName");
    const tabContentList = document.getElementById("tabContentList");
    const project = getProject(name);
    const projectLabel = document.getElementById("projectLabel");
    
    projectLabel.value = name;
    tabContentName.innerHTML = name;
    tabContentList.replaceChildren();
    project.list.forEach((item) => {
        const div = document.createElement("div");
        div.innerHTML = `<li class="listItem">
            <div class="checkbox"><i class="fa-regular fa-square"></i></div>
            ${item.name}
            </li>`
        tabContentList.appendChild(div);

    })
}

function loadProject(project) {
    const tabContentList = document.getElementById("tabContentList");
    tabContentList.replaceChildren();
    project.list.forEach((item) => {
        const div = document.createElement("div");
        div.innerHTML = `<li class="listItem">
            <div class="checkbox"><i class="fa-regular fa-square"></i></div>
            ${item.name}
            </li>`
        tabContentList.appendChild(div);

    })
}

//form submissions
function taskFormSubmit(e) {
    e.preventDefault();
    var name = document.getElementById("tname").value;
    var ddate = document.getElementById("ddate").value;
    var descrip = document.getElementById("descrip").value;
    var priority = document.getElementById("priority").value;
    var projectName = document.getElementById("projectLabel").value;

    const newTask = new Task(name, ddate, descrip, priority);
    const project = getProject(projectName);
    project.list.push(newTask);
    storeProject(project);
    
    /* Clear form */
    document.getElementById("tname").value = "";
    document.getElementById("ddate").value = "";
    document.getElementById("descrip").value = "";
    document.getElementById("priority").value = "";
    toggleTaskForm();
    loadProject(project);
}

function projectFormSubmit(e) {
    e.preventDefault();
    var name = document.getElementById("pname").value;
    const newProject = new Project(name);

    createProjectTab(newProject.name);
    storeProject(newProject);
    
    document.getElementById("pname").value = "";
}


const newTaskForm = document.getElementById("newTaskForm");
const newProjectForm = document.getElementById("newProjectForm");
/* Toggle new Task Form and button visibility */
function toggleTaskForm() {
    if (newTaskForm.style.display === "none") {
        newTaskForm.style.display = "flex";
        document.getElementById("newTaskButton").style.display = "none";
    } else {
        newTaskForm.style.display = "none";
        document.getElementById("newTaskButton").style.display = "flex";
    }
}

function toggleCheckBox(e) {
    if (e.target.firstElementChild.classList.contains('fa-square')) {
        e.target.replaceChildren();
        e.target.innerHTML = `<i class="fa-regular fa-square-check"></i>`
    } else if (e.target.firstElementChild.classList.contains('fa-square-check')) {
        e.target.replaceChildren();
        e.target.innerHTML = `<i class="fa-regular fa-square"></i>`;
    }
    
}


const eventListeners = () => {
    //toggle task form visibility
    const newTaskButton = document.getElementById("newTaskButton");
    newTaskButton.onclick = toggleTaskForm;

    //submit forms 
    newTaskForm.onsubmit = taskFormSubmit;
    newProjectForm.onsubmit = projectFormSubmit;

    document.addEventListener('click', function(e) {
        //open project Tabs
        if (e.target.classList.contains("pNameTab")) {
            openProject(e);
        } 
        //delete project Tabs
        else if (e.target.classList.contains("binImg")) {
            deleteProjectTab(e.target.parentElement.firstElementChild.innerHTML);
        } 
        //toggle checkboxes
        else if (e.target.classList.contains('checkbox')) {
            toggleCheckBox(e);
        }
    })

}



export {eventListeners, loadPage};