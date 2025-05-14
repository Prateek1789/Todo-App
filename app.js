class Task {
    constructor(title, checklist = [], flag) {
        this.title = title;
        this.checklistItems = checklist;
        this.isChecklist = this.checklistItems.length > 0 && flag;
    };

    createTask(iD) {
       return `<div class="task-head">
                    <div class="">
                        <input type="checkbox" name="task_complete" class="main_checkbox" id="task_check${iD}" style="display: none;">
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
    };

    renderTask(parent, iD) {
        const newTaskItem = document.createElement("li");
        newTaskItem.className = "task-list-item unchecked";
        newTaskItem.dataset.taskID = iD;
        newTaskItem.innerHTML = this.createTask(iD);
        parent.appendChild(newTaskItem);

        if (this.isChecklist) {
            newTaskItem.innerHTML += `\n<ul class="check-list"></ul>`;

            const checkList = newTaskItem.querySelector(".check-list");

            this.checklistItems.forEach((itm, idx) => {
                const child = document.createElement("li");
                child.className = "check-list-item";
                child.innerHTML = `<input type="checkbox" name="user_task_checklist" id="check_list_task${idx + 1}_${iD}">
                                   <label for="check_list_task${idx + 1}_${iD}">${itm}</label>`;
                checkList.appendChild(child);
            });
        };
    };
};

class ToDoApp {
    constructor() {
        this.taskList = document.querySelector(".task-list");
        this.taskInput = document.querySelector("#task-input");
        this.totalTaskCounter = document.querySelector(".total-task");
        this.compTaskCounter = document.querySelector(".task-completed");
        this.addCheckListBtn = document.querySelector(".add-checklist-btn");
        this.isCheckListActive = this.addCheckListBtn.classList.contains("active");
        this.totalTasks = 0;
        this.completedTasks = 0;
        this.taskID = 1;
        this.isEditModeOn = false;
        this.taskBeingEdited;
        this.init();
    };

    init() {
        document.addEventListener("click", e => {
            this.appOperations(e);
        });
    };

    countTask() {
        this.totalTasks = [...document.querySelectorAll(".task-list-item")].length;
        this.totalTaskCounter.textContent = this.totalTasks;
    };

    countCompletedTask() {
        this.completedTasks = [...document.querySelectorAll(".checked")].length;
        this.compTaskCounter.textContent = this.completedTasks;
    };

    parseInput() {
        const [title, ...checkList] = this.taskInput.value.split(".");
        return { title, checkList };
    };

    initEditMode(parent) {
        const taskTitle = parent.querySelector(".task").textContent;

        if (parent.querySelector(".check-list")) {
            const checkListContainer = parent.querySelector(".check-list");
            const checkListItems = [taskTitle]; 
            checkListContainer.querySelectorAll("label").forEach(itm => {
                checkListItems.push(itm.textContent);
            });
            const editableString = checkListItems.join(".");
            this.taskInput.value = editableString;
        }
        else {
            this.taskInput.value = taskTitle;
        }
    }

    appOperations(e) {
        if (e.target.closest(".add-checklist-btn")) {
            this.addCheckListBtn.classList.toggle("active");
            this.isCheckListActive = this.addCheckListBtn.classList.contains("active");
        }

        if (e.target.closest(".add-task-btn") && this.taskInput.value) {
            if (this.isEditModeOn) {
                const titleElement = this.taskBeingEdited.querySelector(".task");
                const checkList = this.taskBeingEdited.querySelector(".check-list");
                const inputObject = this.parseInput();

                if (inputObject.checkList.length > 0 && !checkList) {
                    titleElement.textContent = inputObject.title;
                    this.taskBeingEdited.innerHTML += `\n<ul class="check-list"></ul>`;
                    const newCheckList = this.taskBeingEdited.querySelector(".check-list");

                    inputObject.checkList.forEach((itm, idx) => {
                        let parentId = this.taskBeingEdited.dataset.taskID;
                        const child = document.createElement("li");
                        child.className = "check-list-item";
                        child.innerHTML = `<input type="checkbox" name="user_task_checklist" id="check_list_task${idx + 1}_${parentId}">
                                           <label for="check_list_task${idx + 1}_${parentId}">${itm}</label>`;
                        newCheckList.appendChild(child);
                    });
                }
                else if (checkList) {
                    titleElement.textContent = inputObject.title;
                    const checkListItemsCount = checkList.querySelectorAll("label").length;
                    const newCheckListItemsCount = inputObject.checkList.length;
                    
                    if (newCheckListItemsCount > checkListItemsCount) {
                        let parentId = this.taskBeingEdited.dataset.taskID;
                        const child = document.createElement("li");
                        child.className = "check-list-item";
                        child.innerHTML = `<input type="checkbox" name="user_task_checklist" id="check_list_task${newCheckListItemsCount}_${parentId}">
                                           <label for="check_list_task${newCheckListItemsCount}_${parentId}"></label>`;
                        checkList.appendChild(child);

                        checkList.querySelectorAll("label").forEach((itm, idx) => {
                            itm.textContent = inputObject.checkList[idx];
                        });
                    }

                    checkList.querySelectorAll("label").forEach((itm, idx) => {
                        itm.textContent = inputObject.checkList[idx];
                    });

                    if (inputObject.checkList.length === 0) {
                        checkList.remove();
                    }
                }
                else {
                    titleElement.textContent = this.taskInput.value;
                }
                
                this.taskInput.value = '';
                this.isEditModeOn = false;
                this.taskBeingEdited = null;
                return;
            };

            const inputObject = this.parseInput();
            const newTask = new Task(inputObject.title, inputObject.checkList, this.isCheckListActive);
            newTask.renderTask(this.taskList, this.taskID);
            this.countTask();
            this.taskInput.value = '';
            this.taskID++;
        }

        if (e.target.closest(`.main_checkbox`)) {
            const parent = e.target.closest("li");
            parent.classList.toggle("unchecked");
            parent.classList.toggle("checked");
            this.countCompletedTask();
        }

        if (e.target.closest(".edit-task")) {
            const li = e.target.closest("li");
            this.initEditMode(li);
            this.isEditModeOn = true;
            this.taskBeingEdited = li;
        }
        
        if (e.target.closest(".delete-task")) {
            let parent = e.target.closest("li");
            requestAnimationFrame(() => {
                parent.classList.add("delete");
            });
            parent.addEventListener("animationend", () => {
                this.taskList.removeChild(parent);
                this.countTask();
                this.countCompletedTask();
            }, { once: true });
        }
    };
};

const myApp = new ToDoApp();

/* Mock input: New Task 1.add more 1.add more 2.add more 3 */