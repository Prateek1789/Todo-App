import { useState, useRef, type KeyboardEvent } from "react";
import { useTodo } from "../context/TodoContext";
import { Pencil, Trash2 } from "lucide-react";
import { type TodoVals } from "../context/TodoContext";

const Todo = ({ id, title, status }: TodoVals) => {

  const { updateTodo, toggleTodo, deleteTodo } = useTodo();
  const [isEditing, setEditing] = useState(false);
  const [editingText, setEditingText] = useState(title);
  const todoRef = useRef<HTMLDivElement | null>(null);

  const updateTitle = () => {
    updateTodo(id, editingText);
    setEditing(false);
  };

  const handleEnter = (e: KeyboardEvent) => {
    if (e.key === 'Enter') updateTitle();
    if (e.key === 'Escape') setEditing(false);
  };

  return (
    <div ref={todoRef}
         data-id={id}
         className={`w-full h-full px-6 flex justify-between rounded-2xl bg-background shadow-lg shadow-neutral-300`}>
      <div className="h-full w-full py-2 flex items-center gap-4">
        <input type="checkbox" 
               name="todo-check"
               id={`check-todo-${id}`}
               checked={status}
               disabled={isEditing}
               onChange={() => toggleTodo(id)}
               className="appearance-none relative w-5 h-5 border border-neutral-300 rounded-md checked:bg-green-100 checked:border-green-400 peer transition-colors duration-200 cursor-pointer"/>
        <label htmlFor={`check-todo-${id}`}
               className={`${isEditing ? 'hidden': 'block'} text-lg md:text-xl peer-checked:line-through peer-checked:text-neutral-400 peer-checked:text-sm peer-checked:select-none transition-all duration-200 cursor-pointer`}>
          {title}
        </label>
        <input type="text"
               autoFocus
               value={editingText}
               name="editing_input" 
               id={`editing-input-${id}`} 
               className={`${isEditing ? "block" : "hidden"} border-0 outline-0 border-b border-blue-400`}
               onChange={(e) => setEditingText(e.target.value)}
               onKeyDown={handleEnter} />
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