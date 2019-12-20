const initialState = {
    inputs : []
}

export const inputReducer = (state = initialState, action) => {
    switch(action.type){
        case "add_input":
            const newState = Object.assign({}, state);
            newState.inputs.push("this is sample text");
            return newState;

        case "edit_input":
            const newStat = Object.assign({}, state);
            newStat.inputs[action.payload.id] = action.payload.txt;
            return newStat;

        default :
            return state;
    }
}