class Task {
    constructor(title, checklist = [], flag) {
        this.title = title;
        this.checklistItems = checklist;
        this.isCompleted = false;
        this.isChecklist = this.checklistItems.length > 0 && flag;
    }

    createTask(iD) {
       return `<div class="task-head">
                    <div class="">
                        <input type="checkbox" name="task_complete" id="task_check${iD}" style="display: none;">
                        <label for="task_check${iD}"><img src="./assets/check.svg" alt=""></label>
                        <h4 class="task">${this.title}</h4>
                    </div>
                    <div class="task-actions">
                        <button class="edit-task">
                            <img src="./assets/edit.svg" alt="Edit icon">
                        </button>
                        <button class="delete-task">
                            <img src="./assets/delete.svg" alt="Delete Icon">
                        </button>
                    </div>
                </div>`;
    }

    renderTask(parent, iD) {
        if (this.isChecklist) {
            const newTaskItem = document.createElement("li");
            newTaskItem.className = "task-list-item";
            newTaskItem.innerHTML = this.createTask(iD);
            newTaskItem.innerHTML += `\n<ul class="check-list"></ul>`;

            parent.appendChild(newTaskItem);

            const checkList = newTaskItem.querySelector(".check-list");

            this.checklistItems.forEach((itm, idx) => {
                const child = document.createElement("li");
                child.className = "check-list-item";
                child.innerHTML = `<input type="checkbox" name="user_task_checklist" id="check_list_task${idx + 1}">
                                   <label for="check_list_task${idx + 1}">${itm}</label>`;
                checkList.appendChild(child);
            });
        }
        else {
            const newTaskItem = document.createElement("li");
            newTaskItem.className = "task-list-item";
            newTaskItem.innerHTML = this.createTask(iD);
            parent.appendChild(newTaskItem);
        }
    }
}

class ToDoApp {
    constructor() {
        this.taskList = document.querySelector(".task-list");
        this.taskInput = document.querySelector("#task-input");
        this.totalTaskCounter = document.querySelector(".total-task");
        this.compTaskCounter = document.querySelector(".task-completed");
        this.addCheckListBtn = document.querySelector(".add-checklist-btn");
        this.isCheckListActive = this.addCheckListBtn.classList.contains("active");
        this.totalTasks = 0;
        this.completedTask = 0;
        this.taskID = 1;
        this.isEditModeOn = false;
        this.init();
    }

    init() {
        document.addEventListener("click", e => {
            this.appOperations(e);
        });
    }

    countTask() {
        this.totalTasks = [...document.querySelectorAll(".task-list-item")].length;
        this.totalTaskCounter.textContent = this.totalTasks;
    }

    appOperations(e) {
        if (e.target.closest(".add-checklist-btn")) {
            this.addCheckListBtn.classList.toggle("active");
            this.isCheckListActive = this.addCheckListBtn.classList.contains("active");
        }

        if (e.target.closest(".add-task-btn") && this.taskInput.value && !this.isEditModeOn) {
            const taskString = this.taskInput.value.split(".");
            const taskName = taskString[0];
            taskString.shift();
            const newTask = new Task(taskName, taskString, this.isCheckListActive);
            newTask.renderTask(this.taskList, this.taskID);
            this.countTask();
            this.taskInput.value = '';
            this.taskID++;
        }
        
        if (e.target.closest(".delete-task")) {
            let parent = e.target.closest("li");
            requestAnimationFrame(() => {
                parent.classList.add("delete");
            });
            parent.addEventListener("animationend", () => {
                this.taskList.removeChild(parent);
                this.countTask();
            }, { once: true});
        }
    }
}

const myApp = new ToDoApp();

/* Mock input: New Task 1.add more 1.add more 2.add more 3 */