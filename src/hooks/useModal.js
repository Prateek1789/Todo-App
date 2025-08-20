import { useEffect, useContext } from "react";
import { FormContext } from "../context/todoContext";

const useModal = (dialog, title, summary) => {
    const { formState, isEditing, editingTodo } = useContext(FormContext);

    useEffect(() => {
        if (!formState && !isEditing) {
            title.current.value = '';
            summary.current.value = '';
            dialog.current.close();
        }
        else if (formState && !isEditing) {
            dialog.current.showModal();
        }
        else if (formState && isEditing) {
            title.current.value = editingTodo.title;
            summary.current.value = editingTodo.summary;
            dialog.current.showModal();
        }

    }, [formState, isEditing]);

    return [isEditing, editingTodo]
}

export default useModal