const initialState = {
    categories : []
}

export const roomReducer = (state = initialState, action) => {
    switch(action.type){
        case "add_category":
            const category = action.payload.category;
            const newState = Object.assign({}, state);
            newState.categories.push(category);
            return newState;

        default :
            return state;
    }
}