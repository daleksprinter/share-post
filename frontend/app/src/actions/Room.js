export const addCategory = (data) => {
    return {
        type : 'add_category',
        payload : {
            category : data
        }
    };
}

export const setCategories = (data) => {
	return {
		type : 'set_categories',
		payload : {
			categories : data
		}
	}
}
