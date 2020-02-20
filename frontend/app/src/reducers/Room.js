const initialState = {
	categories : []
}

export const roomReducer = (state = initialState, action) => {
	switch(action.type){
		case "set_categories" : {
			let categories = action.payload.categories;
			let newState = Object.assign({}, state);
			newState.categories = categories;
			return newState;
		}
		case "add_category":{
			let category = action.payload.category;
			let newState = Object.assign({}, state);
			newState.categories.push(category);
			return newState;


		}
		default :
			return state;
	}
}
