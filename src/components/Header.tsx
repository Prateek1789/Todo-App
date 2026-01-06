import { useTodo } from "../context/TodoContext";

interface HeaderProps {};

const Header = ({}: HeaderProps) => {
    const { total, completed } = useTodo();
    const barWidth = (100 / total) * completed;

    return (
        <header className='w-full h-auto text-gray-800 p-4 rounded-lg flex flex-col gap-4'>
            <h1 className='text-xl'>Todo List</h1>
            <div className="w-full h-auto">
                <p className='text-md mb-2'>{completed} / {total} Tasks completed</p>
                <span className='progress-bar w-full h-4 rounded-sm bg-gray-200 flex p-[0.15rem]'>
                    <span className={`progress-bar-fill h-full bg-neutral-800 rounded-xs`}
                          style={{ width: `${barWidth}%` }}></span>
                </span>
            </div>
        </header>
    )
};

export default Header