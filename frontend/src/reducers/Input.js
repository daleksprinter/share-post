const initialState = {
    inputs : ['']
}

export const inputReducer = (state = initialState, action) => {
    switch(action.type){
        case "add_input":
            const newState = Object.assign({}, state);
            if(newState.inputs.length > 2) return state;
            newState.inputs.push("");
            return newState;

        case "edit_input":
            const newStat = Object.assign({}, state);
            newStat.inputs[action.payload.id] = action.payload.txt;
            return newStat;
        
        case "delete_input":
            console.log(action.payload.id)
            const newSta = Object.assign({}, state);
            const arr = newSta.inputs.slice(0, action.payload.id).concat(newSta.inputs.slice(action.payload.id + 1, newSta.inputs.length));
            console.log('arr', arr)
            newSta.inputs.length = 0;
            console.log(newSta.inputs);
            for(const e of arr) newSta.inputs.push(e);
            console.log('newsta', newSta.inputs)
            return newSta;

        default :
            return state;
    }
}