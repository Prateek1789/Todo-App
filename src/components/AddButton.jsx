import { useContext } from "react"
import { FormContext } from "../context/todoContext"

const AddButton = () => {
    const { setFormState } = useContext(FormContext);

    return (
        <button className='add-btn w-82 h-12 rounded-lg text-gray-200 flex items-center justify-center absolute bottom-1 left-1/2 -translate-1/2'
                /* aria-pressed={formState} */
                onClick={() => setFormState(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#ffffff" viewBox="0 0 24 24" >
                <path d="M3 13h8v8h2v-8h8v-2h-8V3h-2v8H3z"></path>
            </svg>
            Add Task
        </button>
    )
}

export default AddButton