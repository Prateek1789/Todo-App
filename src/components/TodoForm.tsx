import { useState, type FormEvent } from 'react';
import { useTodo } from '../context/TodoContext';
import { Plus, Flag } from 'lucide-react';

interface TodoFormProps {};

const TodoForm = ({}: TodoFormProps) => {
    const [task, setTask] = useState('');
    const { priority, cyclePriority, addTodo } = useTodo();

    const priorityColors = {
        low: 'oklch(62.3% 0.214 259.815)',
        medium: 'oklch(76.9% 0.188 70.08)',
        high: ' oklch(63.7% 0.237 25.331)'
    };

    const submit = (e: FormEvent) => {
        e.preventDefault();
       addTodo(task, priority);
       setTask('');
    };

    return (
        <div className='w-full h-auto px-4'>
            <form action=""
                  onSubmit={submit}
                  className="w-full h-18 flex items-center gap-4 px-4 py-2 rounded-3xl bg-background has-focus:outline-2 outline-blue-500 shadow-lg has-focus:shadow-blue-100">
                <button type="submit"
                        className='w-10 h-10 grid place-content-center bg-blue-400 disabled:bg-blue-100 rounded-xl shrink-0'
                        disabled={task ? false : true}>
                    <Plus color="white" />
                </button>
                <input  type="text" 
                        name="task_input" 
                        id="task-input"
                        className='w-full h-full rounded-xl focus:outline-0'
                        placeholder="Add new task..."
                        value={task} 
                        onChange={(e) => setTask(e.target.value)}/>
                <button type="button"
                        className='w-10 h-10 grid place-content-center bg-neutral-100 rounded-xl shrink-0'
                        onClick={cyclePriority}
                        title={`Priority: ${priority}`}>
                    <Flag color={priorityColors[priority]}
                          strokeWidth='3px'/>
                </button>
        </form>
        </div>
    )
};

export default TodoForm
