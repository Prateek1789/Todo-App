class ToDoApp {
    constructor() {
        this.taskList = document.querySelector(".task-list");
        this.taskInput = document.querySelector("#task-input");
        this.totalTaskCounter = document.querySelector(".total-task");
        this.completedTaskCounter = document.querySelector(".task-completed");
        this.checkListArray = [];
        this.task = '';
        this.totalTasks = 0;
        this.completedTask = 0;
        this.itemNum = 1;
        this.init();
    }

    init() {
        document.addEventListener("click", e => {
            this.checkTask(e);
            if (e.target.closest(".add-task-btn")) {
                this.itemNum++;
            }
        })
    }

    checkTask(event) {
        if (event.target.closest(".add-task-btn") && this.taskInput.value) {
            this.task = this.taskInput.value;
            this.generateTaskItem(this.task, true);
            this.taskInput.value = '';
        }
        if (event.target.closest(".delete-task")) {
            let parent = event.target.closest("li");
            this.taskList.removeChild(parent);
            this.totalTasks--;
            this.totalTaskCounter.innerHTML = this.totalTasks;
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
                                            <input type="checkbox" name="task_complete" id="task_check${this.itemNum}" style="display: none;">
                                            <label for="task_check${this.itemNum}"><img src="./assets/check.svg" alt=""></label>
                                            <h4 class="task">${newTask}</h4>
                                        </div>
                                        <div class="task-actions">
                                            <button class="edit-task">
                                                <img src="./assets/edit.svg" alt="Edit icon">
                                            </button>
                                            <button class="insert-checklist">
                                                <img src="./assets/add-checklist.svg" alt="Add check-list icon">
                                            </button>
                                            <button class="delete-task">
                                                <img src="./assets/delete.svg" alt="Delete Icon">
                                            </button>
                                        </div>
                                    </div>
                                    <ul class="check-list"></ul>`;

            this.taskList.appendChild(newTaskItem);

            this.checkListArray = [...(document.querySelectorAll(".check-list"))];

            taskString.forEach((itm) => {
                const child = document.createElement("li");
                child.className = "check-list-item";
                child.innerHTML = `<input type="checkbox" name="user_task_checklist" id="">
                                   <label for="">${itm}</label>`;
                this.checkListArray[this.itemNum - 1].appendChild(child);
            });

            console.log(this.itemNum - 1);
            console.log(this.checkListArray[this.itemNum - 1]);
            console.log(this.checkListArray);
            taskString = '';
            newTask = '';
        }
        else {
            const newTaskItem = document.createElement("li");
            newTaskItem.className = "task-list-item";
            newTaskItem.innerHTML = `<div class="task-head">
                                        <div class="">
                                            <input type="checkbox" name="task_complete" id="task_check${this.itemNum}" style="display: none;">
                                            <label for="task_check${this.itemNum}"><img src="./assets/check.svg" alt=""></label>
                                            <h4 class="task">${task}</h4>
                                        </div>
                                        <div class="task-actions">
                                            <button class="edit-task">
                                                <img src="./assets/edit.svg" alt="Edit icon">
                                            </button>
                                            <button class="insert-checklist">
                                                <img src="./assets/add-checklist.svg" alt="Add check-list icon">
                                            </button>
                                            <button class="delete-task">
                                                <img src="./assets/delete.svg" alt="Delete Icon">
                                            </button>
                                        </div>
                                    </div>`;
            this.taskList.appendChild(newTaskItem);
        }
        
        this.totalTasks = [...document.querySelectorAll(".task-list-item")].length;
        this.totalTaskCounter.innerHTML = this.totalTasks;
    }
}

const myApp = new ToDoApp();

/* Mock input: New Task 1.add more 1.add more 2.add more 3 */