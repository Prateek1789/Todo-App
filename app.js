class ToDoApp {
    constructor() {
        this.taskList = document.querySelector(".task-list");
        this.taskInput = document.querySelector("#task-input");
        this.totalTaskCounter = document.querySelector(".total-task");
        this.completedTaskCounter = document.querySelector(".task-completed");
        this.addCheckListBtn = document.querySelector(".add-checklist-btn");
        this.task = '';
        this.totalTasks = 0;
        this.completedTask = 0;
        this.checkBoxIDNum = 1;
        this.isEditModeOn = false;
        this.isCheckListBtnOn = this.addCheckListBtn.classList.contains("active");
        this.init();
    }

    init() {
        document.addEventListener("click", e => {
            this.checkTask(e);
        });

        /* --This code is only here to keep the mock task item in total task count */
        this.totalTasks = [...document.querySelectorAll(".task-list-item")].length;
        this.totalTaskCounter.innerHTML = this.totalTasks;
    }

    checkTask(event) {
        if (event.target.closest(".add-checklist-btn")) {
            this.addCheckListBtn.classList.toggle("active");
            this.isCheckListBtnOn = this.addCheckListBtn.classList.contains("active");
        }

        if (event.target.closest(".add-task-btn") && this.taskInput.value && !this.isEditModeOn) {
            this.task = this.taskInput.value;
            this.generateTaskItem(this.task, this.isCheckListBtnOn);
            this.taskInput.value = '';
            this.task = '';
        }
        
        if (event.target.closest(".delete-task")) {
            let parent = event.target.closest("li");
            this.totalTasks--;
            this.totalTaskCounter.innerHTML = this.totalTasks;
            requestAnimationFrame(() => {
                parent.classList.add("delete");
            });
            parent.addEventListener("animationend", () => {
                this.taskList.removeChild(parent);
            }, { once: true} );
        }
    }

    generateTaskItem(task, isChecklist = false) {
        if (isChecklist) {
            let taskString = task.split(".");
            let newTask = taskString.shift();

            const newTaskItem = document.createElement("li");
            newTaskItem.className = "task-list-item";
            newTaskItem.innerHTML = `<div class="task-head">
                                        <div class="">
                                            <input type="checkbox" name="task_complete" id="task_check${this.checkBoxIDNum}" style="display: none;">
                                            <label for="task_check${this.checkBoxIDNum}"><img src="./assets/check.svg" alt=""></label>
                                            <h4 class="task">${newTask}</h4>
                                        </div>
                                        <div class="task-actions">
                                            <button class="edit-task">
                                                <img src="./assets/edit.svg" alt="Edit icon">
                                            </button>
                                            <button class="delete-task">
                                                <img src="./assets/delete.svg" alt="Delete Icon">
                                            </button>
                                        </div>
                                    </div>
                                    <ul class="check-list"></ul>`;

            this.taskList.appendChild(newTaskItem);

            const subList = newTaskItem.querySelector(".check-list");

            taskString.forEach((itm) => {
                const child = document.createElement("li");
                child.className = "check-list-item";
                child.innerHTML = `<input type="checkbox" name="user_task_checklist" id="">
                                   <label for="">${itm}</label>`;
                subList.appendChild(child);
            });

            taskString = '';
            newTask = '';
            this.checkBoxIDNum++;
        }
        else {
            const newTaskItem = document.createElement("li");
            newTaskItem.className = "task-list-item";
            newTaskItem.innerHTML = `<div class="task-head">
                                        <div class="">
                                            <input type="checkbox" name="task_complete" id="task_check${this.checkBoxIDNum}" style="display: none;">
                                            <label for="task_check${this.checkBoxIDNum}"><img src="./assets/check.svg" alt=""></label>
                                            <h4 class="task">${task}</h4>
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
            this.taskList.appendChild(newTaskItem);
            this.checkBoxIDNum++;
        }
        
        this.totalTasks = [...document.querySelectorAll(".task-list-item")].length;
        this.totalTaskCounter.innerHTML = this.totalTasks;
    }
}

const myApp = new ToDoApp();

/* Mock input: New Task 1.add more 1.add more 2.add more 3 */