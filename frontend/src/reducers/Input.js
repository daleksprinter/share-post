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
        
        case "delete_input":
            console.log(action.payload.id)
            const newSta = Object.assign({}, state);
            const arr = newSta.inputs.slice(0, action.payload.id).concat(newSta.inputs.slice(action.payload.id + 1, newSta.inputs.length));
            console.log(arr)
            newSta.inputs = arr;
            console.log(newSta)
            return newSta;

        default :
            return state;
    }
}