export const addArea = () => {
    return {
        type : 'add_input',
    };
}

export const editInput = (id, txt) => {
    return {
        type : 'edit_input',
        payload : {
            id: id,
            txt: txt,
        }
    }
}