export const addCategory = (data) => {
    return {
        type : 'add_category',
        payload : {
            category : data
        }
    };
}