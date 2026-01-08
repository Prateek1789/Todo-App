import { useTodo } from "../context/TodoContext";

interface HeaderProps {};

const Header = ({}: HeaderProps) => {
    const { total, completed } = useTodo();
    const barWidth = (100 / total) * completed;
    const date = new Date().toLocaleDateString("en-us", { dateStyle: "long" });

    return (
        <header className='w-full h-auto text-gray-800 rounded-lg flex flex-col gap-4'>
            <h3 className="font-extrabold text-gray-400">{date}</h3>
            <div className="flex justify-between items-end">
                <h1 className="text-sm font-bold">My Day</h1>
                <span className="flex gap-1 items-baseline text-blue-400 select-none">
                    <p className="text-lg font-bold">{completed}</p>
                    / 
                    <p className="text-sm">{total}</p>
                </span>
            </div>
            <div className="w-full h-auto flex items-center">
                <progress max='100'
                          value={barWidth} 
                          className="w-full h-2 rounded-lg" />
            </div>
        </header>
    )
};

export default Header