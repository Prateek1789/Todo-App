import { useEffect, useRef, useContext } from "react"

function TodoForm() {
    const dialogRef = useRef();
    const titleRef = useRef();
    const summaryRef = useRef();
    let priority = 'medium';

    const setPriority = (weight) => priority = weight;

    return (
        <dialog ref={dialogRef} /* open */
                className="max-w-full max-h-full absolute rounded-tl-xl rounded-tr-xl 
                           open:w-full open:px-4 open:pb-4 open:flex open:flex-col open:gap-6 open:bottom-0">
            <span className="w-full text-center p-4 text-2xl border-b-[1px] border-gray-300">Create New Task</span>
            <div className="task-info w-full flex flex-col gap-4">
                <label htmlFor="title-input" className="text-xl flex flex-col gap-2">Task
                    <input type="text" 
                           name="task_title" 
                           id="title-input" 
                           ref={titleRef} 
                           className="w-full h-10 text-sm px-2 border border-gray-300 rounded-lg" 
                           placeholder="Title" />
                </label>
                <textarea name="task_summary" 
                          id="summary-input" 
                          ref={summaryRef} 
                          className="h-20 p-2 text-sm resize-none border border-gray-300 rounded-lg" 
                          placeholder="Summary"></textarea>
            </div>
            <div className="w-full">
                <h2 className="text-xl mb-2">Priority</h2>
                <div className="w-full flex gap-2">
                    <label htmlFor="priority-high" className="w-full h-8 relative flex items-center justify-center border-[1px] border-amber-300 rounded-lg">
                        High
                        <input type="radio" name="priority" id="priority-high" onChange={() => setPriority('high')} className="absolute z-[-1] opacity-0" />
                    </label>
                    <label htmlFor="priority-medium" className="w-full h-8 relative flex items-center justify-center border-[1px] border-blue-300 rounded-lg">
                        Medium
                        <input type="radio" name="priority" id="priority-medium" onChange={() => setPriority('medium')} className="absolute z-[-1] opacity-0" />
                    </label>
                    <label htmlFor="priority-low" className="w-full h-8 relative flex items-center justify-center border-[1px] border-green-300 rounded-lg">
                        Low
                        <input type="radio" name="priority" id="priority-low" onChange={() => setPriority('low')} className="absolute z-[-1] opacity-0" />
                    </label>
                </div>
            </div>
            <div className="w-full flex gap-2">
                <button className="w-full h-10 text-gray-100 rounded-lg"
                        onClick={() => addTodo(titleRef, summaryRef, priority)}>
                        {/* {!isEditing ? 'Create Todo' : 'Confirm'} */} Create Todo
                </button>
                <button className="w-full h-10 text-gray-100 rounded-lg"
                        onClick={() => closeTodoForm(titleRef, summaryRef)}>
                        {/* {!isEditing ? 'Cancel' : 'Delete Todo'} */} Cancel
                </button>
            </div>
        </dialog>
    )
}

export default TodoForm