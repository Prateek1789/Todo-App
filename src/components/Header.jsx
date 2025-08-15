import { useContext, useState } from "react"

const Header = () => {
    /* const { numOfTodos, compTodos } = useContext(HeaderContext);
    const progressBarWidth = () => (100 / numOfTodos) * compTodos; */

    return (
        <header className='w-full h-auto text-gray-800 p-4 rounded-lg flex flex-col gap-4'>
            <h1 className='text-xl'>Daily Tasks</h1>
            <p className='text-md mb-2'>{/* compTodos ||  */0} / {/* numOfTodos */0} Tasks completed</p>
            <span className='progress-bar w-full h-4 rounded-sm bg-gray-200 flex p-[0.1rem]'>
                <span className={`progress-bar-fill h-full bg-[hsl(0,0%,100%)] rounded-xs`}
                      style={{ width: '20%' /* `${progressBarWidth()}%` */ }}></span>
            </span>
        </header>
    )
}

export default Header