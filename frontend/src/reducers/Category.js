const initialState = {
    cards : []
}

export const categoryReducer = (state = initialState, action) => {
    switch(action.type){
        case "add_card":
            const card = action.payload.card;
            const newState = Object.assign({}, state);
            newState.cards.push(card);
            return newState;

        default :
            return state;
    }
}