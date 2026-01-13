import { useState, type KeyboardEvent } from "react";
import { useTodo } from "../context/TodoContext";
import { Pencil, Trash2 } from "lucide-react";
import { type TodoVals } from "../context/TodoContext";

const Todo = ({ id, title, status, priority }: TodoVals) => {
  const { isMobile, updateTodo, toggleTodo, deleteTodo } = useTodo();
  const [isEditing, setEditing] = useState(false);
  const [editingText, setEditingText] = useState(title);

  const priorityColors = {
    low: 'bg-blue-50 text-blue-500',
    medium: 'bg-amber-50 text-amber-500 ',
    high: 'bg-red-50 text-red-500',
  };

  const updateTitle = () => {
    updateTodo(id, editingText);
    setEditing(false);
  };

  const handleEnter = (e: KeyboardEvent) => {
    if (e.key === 'Enter') updateTitle();
    if (e.key === 'Escape') setEditing(false);
  };

  return (
    <div data-id={id}
         className={`w-full h-full px-4 py-2.5 md:px-6 flex justify-between rounded-2xl bg-background shadow-lg shadow-neutral-300`}>
      <div className="w-full flex items-center gap-2 md:gap-4">
        <div className="flex items-center gap-2">
          <label htmlFor={`check-todo-${id}`}
                 className={`${isEditing ? 'hidden': 'flex'} gap-2 md:gap-4 items-center text-sm md:text-xl has-checked:line-through has-checked:text-neutral-400 has-checked:text-sm has-checked:select-none transition-all duration-200 cursor-pointer wrap-normal`}>
            <input type="checkbox" 
                   name="todo-check"
                   id={`check-todo-${id}`}
                   checked={status}
                   disabled={isEditing}
                   onChange={() => toggleTodo(id)}
                   className="appearance-none relative w-5 h-5 border border-neutral-300 rounded-md checked:bg-green-100 checked:border-green-400 transition-colors duration-200 cursor-pointer shrink-0"/>
            { title }
          </label>
          <span className={`${isEditing ? 'hidden': 'flex'} ${priorityColors[priority]} py-0.25 px-1 md:py-0.5 md:px-1.5 uppercase rounded-sm text-xs md:text-[0.7rem] font-semibold select-none`}>
            { isMobile ? priority.charAt(0) : priority }
          </span>
        </div>
        { isEditing &&
          (<input type="text"
                  autoFocus={true}
                  value={editingText}
                  name="editing_input" 
                  id={`editing-input-${id}`} 
                  className="w-1/2 border-0 outline-0 border-b-2 border-blue-400"
                  onChange={(e) => setEditingText(e.target.value)}
                  onKeyDown={handleEnter} />) }
      </div>
      <div className="h-full py-2 flex items-center gap-2 rounded-md">
        <button type="button"
                className={`todo-btn btn-edit ${isEditing ? 'hidden' : 'inline'} p-1.5 rounded-lg hover:bg-blue-100 peer`}
                onClick={() => setEditing(prev => !prev)}>
          <Pencil size={18} className="transition-color duration-200"/>
        </button>
        <button type="button"
                className="todo-btn btn-del p-1.5 rounded-lg hover:bg-red-100"
                onClick={() => deleteTodo(id)}>
          <Trash2 size={18} className="transition-color duration-200" />
        </button>
      </div>
    </div>
  )
};

export default Todo