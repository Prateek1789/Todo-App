import Todo from "./Todo"

const TaskContainer = () => {
    // Demo Todos    
     const todos = [
        {
            id: 'naalsls',
            title: 'Mobile Design',
            date: '15 Aug 2025',
            priority: 'medium',
            isCompleted: false
        },
        {
            id: 'naalsls',
            title: 'No Time To Die',
            date: '15 Aug 2025',
            priority: 'low',
            isCompleted: false
        },
        {
            id: 'naalsls',
            title: 'Schema design',
            date: '15 Aug 2025',
            priority: 'high',
            isCompleted: false
        }
    ]

    return (
        <main className='w-full rounded-lg flex flex-col gap-3'>
            <h2 className='text-2xl text-gray-800'>Today's Tasks</h2>
            <div className='task-container w-full h-full rounded-lg flex flex-col gap-3 overflow-scroll'>
                { todos.map((todo, idx) => <Todo key={idx} task={todo} />) }
            </div>
        </main>
    )
};

export default TaskContainer