
const Todo = ({ task: { id, title, date, priority, isCompleted } }) => {
  const priorityColor = {
    high: 'bg-amber-300',
    medium: 'bg-blue-300',
    low: 'bg-green-300'
  };

  return (
    <div data-id={`${id}`} className='todo w-full h-18 rounded-lg flex items-center pr-2'>
      <div className={`priority-color w-4 h-full ${priorityColor[priority]} rounded-bl-lg rounded-tl-lg`}></div>
      <div className="w-full h-full p-2 flex flex-col gap-1 justify-between">
        <p className='task-title text-md'>{title}</p>
        <span className='flex gap-2 items-center'>
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="#000000" viewBox="0 0 24 24">
            <path d="M7 11H17V13H7z"></path>
            <path d="M7 15H14V17H7z"></path>
            <path d="m19,4h-2v-2h-2v2h-6v-2h-2v2h-2c-1.1,0-2,.9-2,2v14c0,1.1.9,2,2,2h14c1.1,0,2-.9,2-2V6c0-1.1-.9-2-2-2ZM5,20v-12h14v-2,14s-14,0-14,0Z"></path>
          </svg>
          <p className='date-added text-xs'>{date}</p>
        </span>
      </div>
      <input type="checkbox" 
             name="task_check" 
             id="task-checkbox" 
             className='border-none' />
    </div>
  )
}

export default Todo