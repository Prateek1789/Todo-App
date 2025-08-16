import { useContext } from "react"
import { FormContext } from "../context/todoContext"

const AddButton = () => {
    const { formState, setFormState } = useContext(FormContext);

    return (
        <button className='add-btn w-16 h-16 rounded-full flex items-center justify-center absolute bottom-1 left-1/2 -translate-1/2'
                aria-pressed={formState}
                onClick={() => setFormState(!formState)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#ffffff" viewBox="0 0 24 24" >
                <path d="M3 13h8v8h2v-8h8v-2h-8V3h-2v8H3z"></path>
            </svg>
        </button>
    )
}

export default AddButton