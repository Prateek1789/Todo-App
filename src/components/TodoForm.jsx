import { useState, useRef, useContext } from "react"
import { FormContext } from "../context/todoContext";
import useModal from "../hooks/useModal";

function TodoForm() {
    const dialogRef = useRef();
    const titleRef = useRef();
    const summaryRef = useRef();
    let priority = 'medium';
    
    const { addTodo, handleFormState, updateTodo } = useContext(FormContext);
    const [isEditing, editingTodo] = useModal(dialogRef, titleRef, summaryRef);

    const setPriority = (value) => priority = value;
    const getFormData = () => [titleRef.current.value, summaryRef.current.value, priority];

    return (
        <dialog ref={dialogRef} /* open */
                className="max-w-full w-[calc(100%_-_1rem)] max-h-full mt-auto rounded-2xl left-2 bottom-2
                           open:w-[calc(100%_-_1rem)] open:p-4 open:flex open:flex-col open:gap-6">
            <span className="w-full text-center text-2xl ">
                {isEditing ? editingTodo.title : 'Create New Task'}
            </span>
            <div className="task-info w-full flex flex-col gap-4">
                <label htmlFor="title-input" className="sr-only">Title</label>
                <input type="text" 
                           name="task_title" 
                           id="title-input" 
                           ref={titleRef} 
                           className="w-full h-10 text-sm px-2 border border-gray-300 rounded-lg" 
                           placeholder="Title"/>
                <label htmlFor="summary-input" className="sr-only">Summary</label>
                <textarea name="task_summary" 
                          id="summary-input" 
                          ref={summaryRef} 
                          className="h-20 p-2 text-sm resize-none border border-gray-300 rounded-lg" 
                          placeholder="Summary"></textarea>
            </div>
            <div className="w-full">
                <h2 className="text-xl mb-2">Priority</h2>
                <div className="w-full flex gap-2">
                    <label htmlFor="priority-high" className="w-full h-8 relative flex items-center justify-center border-[1px] border-[var(--color-priority-high)] rounded-lg">
                        High
                        <input type="radio" 
                               name="priority" 
                               id="priority-high"
                               className="absolute z-[-1] opacity-0" 
                               /* checked={isEditing && editingTodo.priority === priority} */
                               onChange={() => setPriority('high')} />
                    </label>
                    <label htmlFor="priority-medium" className="w-full h-8 relative flex items-center justify-center border-[1px] border-[var(--color-priority-medium)] rounded-lg">
                        Medium
                        <input type="radio" 
                               name="priority" 
                               id="priority-medium" 
                               className="absolute z-[-1] opacity-0" 
                               /* checked={isEditing && editingTodo.priority === priority} */
                               onChange={() => setPriority('medium')} />
                    </label>
                    <label htmlFor="priority-low" className="w-full h-8 relative flex items-center justify-center border-[1px] border-[var(--color-priority-low)] rounded-lg">
                        Low
                        <input type="radio" 
                               name="priority" 
                               id="priority-low" 
                               className="absolute z-[-1] opacity-0" 
                               /* checked={isEditing && editingTodo.priority === priority}  */
                               onChange={() => setPriority('low')} />
                    </label>
                </div>
            </div>
            <div className="w-full flex gap-2">
                <button className="w-full h-10 text-gray-100 rounded-lg"
                        onClick={() => { !isEditing ? addTodo(...getFormData()) : updateTodo(...getFormData());
                        }}>
                        {!isEditing ? 'Create Todo' : 'Confirm'}
                </button>
                <button className="w-full h-10 text-gray-100 rounded-lg"
                        onClick={handleFormState}>
                        Cancel
                </button>
            </div>
        </dialog>
    )
}

export default TodoForm