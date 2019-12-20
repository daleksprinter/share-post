const initialState = {
    inputs : []
}

export const inputReducer = (state = initialState, action) => {
    switch(action.type){
        case "add_input":
            const newState = Object.assign({}, state);
            newState.inputs.push("this is sample text");
            return newState;

        

        default :
            return state;
    }
}