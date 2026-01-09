import { useState, useRef, type FormEvent } from 'react';
import { useTodo } from '../context/TodoContext';
import { Plus } from 'lucide-react';

interface TodoFormProps {};

const TodoForm = ({}: TodoFormProps) => {
    const [task, setTask] = useState('');
    const { addTodo } = useTodo();
    const inputRef = useRef<HTMLInputElement | null>(null);

    const submit = (e: FormEvent) => {
        e.preventDefault();
       addTodo(task);
       setTask('');
    };

    return (
        <div className='w-full h-auto px-4'>
        <form action=""
              onSubmit={submit}
              className="w-full h-22 flex items-center gap-4 px-4 py-2 rounded-2xl bg-background has-focus:outline-2 outline-blue-500 shadow-lg has-focus:shadow-blue-100">
            <button type="submit"
                    className='w-10 h-10 grid place-content-center bg-blue-400 disabled:bg-blue-100 rounded-xl shrink-0'
                    onClick={() => {}}
                    disabled={task ? false : true}>
                <Plus color="white" />
            </button>
            <input ref={inputRef}
                   type="text" 
                   name="task_input" 
                   id="task-input"
                   className='w-full h-full rounded-xl focus:outline-0'
                   placeholder="Add new task..."
                   value={task} 
                   onChange={(e) => setTask(e.target.value)}/>
        </form>
        </div>
    )
};

export default TodoForm
