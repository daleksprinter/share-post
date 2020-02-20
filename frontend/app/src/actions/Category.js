export const addCard = (data) => {
    return {
        type : 'add_card',
        payload : {
            card : data
        }
    };
}
export const setCards = (data) => {
	return {
		type : 'set_cards',
		payload : {
			cards : data
		}
	}
}
