// import { useTodo } from "../context/TodoContext"
import { Plus } from "lucide-react"

interface AddButtonProps {}

const AddButton = ({}: AddButtonProps) => {
    // const { setFormState } = useContext(FormContext);

    return (
        <button type="submit"
                className='w-10 h-10 grid place-content-center bg-neutral-300 rounded-xl shrink-0'
                /* aria-pressed={formState} */
                onClick={() => {}}>
            <Plus color="grey" />
        </button>
    )
};

export default AddButton

//() => setFormState(true)