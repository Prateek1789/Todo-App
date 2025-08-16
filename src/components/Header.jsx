import { useContext, useState } from "react"
import { HeaderContext } from "../context/todoContext"

const Header = () => {
    const { totalTodos, completedTodos } = useContext(HeaderContext);
    const progressBarWidth = () => (100 / totalTodos) * completedTodos;

    return (
        <header className='w-full h-auto text-gray-800 p-4 rounded-lg flex flex-col gap-4'>
            <h1 className='text-xl'>Daily Tasks</h1>
            <p className='text-md mb-2'>{completedTodos || 0 } / {totalTodos} Tasks completed</p>
            <span className='progress-bar w-full h-4 rounded-sm bg-gray-200 flex p-[0.1rem]'>
                <span className={`progress-bar-fill h-full bg-[hsl(0,0%,100%)] rounded-xs`}
                      style={{ width: `${progressBarWidth()}%` }}></span>
            </span>
        </header>
    )
}

export default Header