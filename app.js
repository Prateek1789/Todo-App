
class App {
    constructor(task) {
        this.task = task;
        this.taskList = document.querySelector(".task-list");
        this.taskInput = document.querySelector("#task-input");
        this.addBtn = document.querySelector(".add-task-btn");
        this.init();
    }
    init() {
        
    }
    generateTaskItem() {
        const newTaskItem = `<li class="task-list-item">
                            <div class="task-head">
                                <div class="">
                                    <input type="checkbox" name="task_complete" id="task_check1" style="display: none;">
                                    <label for="task_check1"><img src="./assets/check.svg" alt=""></label>
                                    <h4 class="task">${this.task}</h4>
                                </div>
                                <div class="task-actions">
                                    <button>
                                        <img src="./assets/edit.svg" alt="Edit icon">
                                    </button>
                                    <button>
                                        <img src="./assets/add-checklist.svg" alt="Add check-list icon">
                                    </button>
                                    <button>
                                        <img src="./assets/delete.svg" alt="Delete Icon">
                                    </button>
                                </div>
                            </div>
                        </li>`;
        taskList.appendChild(newTaskItem);
    }
}
