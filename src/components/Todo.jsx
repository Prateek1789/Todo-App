import { useContext, useRef } from "react";
import { TodoContext } from "../context/todoContext";

const Todo = ({ task: { id, title, date, priority, isCompleted } }) => {
  const { checkTodo, handleEdit, deleteTodo } = useContext(TodoContext);
  const todoRef = useRef();

  const priorityColor = {
    high: 'bg-[var(--color-priority-high)]',
    medium: 'bg-[var(--color-priority-medium)]',
    low: 'bg-[var(--color-priority-low)]'
  };

  return (
    <div data-id={`${id}`} ref={todoRef} className='todo w-full h-auto rounded-lg flex items-center pr-2'>
      <div className={`priority-color w-4 h-full ${priorityColor[priority]} rounded-bl-lg rounded-tl-lg`}></div>
      <div className="w-full h-full p-2 flex flex-col gap-3 justify-between">
        <p className='task-title text-md leading-5'>{title}</p>
        <span className='flex gap-2 items-center'>
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="#000000" viewBox="0 0 24 24">
            <path d="M7 11H17V13H7z"></path>
            <path d="M7 15H14V17H7z"></path>
            <path d="m19,4h-2v-2h-2v2h-6v-2h-2v2h-2c-1.1,0-2,.9-2,2v14c0,1.1.9,2,2,2h14c1.1,0,2-.9,2-2V6c0-1.1-.9-2-2-2ZM5,20v-12h14v-2,14s-14,0-14,0Z"></path>
          </svg>
          <p className='date-added text-xs'>{date}</p>
        </span>
      </div>
      <label htmlFor={`task-checkbox-${id}`} className="check-label rounded-md p-0.5 relative">
        <svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="22px" fill="#eaeaea">
          <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
        </svg>
        <input type="checkbox" 
              name="task_check" 
              id={`task-checkbox-${id}`} 
              className='task-check border-none absolute left-1/2 top-1/2 transform-[translate(-50%,_-50%)] z-[-1]' 
              onChange={() => checkTodo(Number(todoRef.current.dataset.id))}
              checked={isCompleted ? true : false} />
      </label>
      <button type="button" 
              className="p-0.5 ml-2 bg-transparent rounded-md"
              onClick={() => handleEdit(Number(todoRef.current.dataset.id))}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#ffffff" viewBox="0 0 24 24" className="m-auto" >
          <path d="m19.41,3c-.78-.78-2.05-.78-2.83,0L4.29,15.29c-.13.13-.22.29-.26.46l-1,4c-.08.34.01.7.26.95.19.19.45.29.71.29.08,0,.16,0,.24-.03l4-1c.18-.04.34-.13.46-.26l12.29-12.29c.78-.78.78-2.05,0-2.83l-1.59-1.59Zm-11.93,15.1l-2.11.53.53-2.11L15,7.41l1.59,1.59-9.1,9.1Zm10.51-10.51l-1.59-1.59,1.59-1.59,1.59,1.58-1.59,1.59Z"></path>
        </svg>
      </button>
      <button type="button" 
              className="p-0.5 ml-2 bg-transparent rounded-md"
              onClick={() => deleteTodo(Number(todoRef.current.dataset.id))}>
        <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" fill="#ffffff" viewBox="0 -960 960 960" className="m-auto">
          <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
        </svg>
      </button>
    </div>
  )
}

export default Todo