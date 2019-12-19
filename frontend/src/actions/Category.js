export const addCard = (data) => {
    return {
        type : 'add_card',
        payload : {
            card : data
        }
    };
}