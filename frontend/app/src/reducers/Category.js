const initialState = {
	cards : []
}

export const categoryReducer = (state = initialState, action) => {
	switch(action.type){
		case "set_cards": {

			let cards = action.payload.cards;
			let newState = Object.assign({}, state);
			newState.cards = cards;
			return newState


		}     
		case "add_card":{

			let card = action.payload.card;
			let newState = Object.assign({}, state);
			newState.cards.push(card);
			return newState;


		}
		default :
			return state;
	}
}
