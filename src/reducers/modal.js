export default (state = {}, action) => {

    switch (action.type) {
        case 'SHOW_MODAL':
            return {
                ...state,
                modalType: action.payload.modalType,
                modalProps: action.payload.modalProps,
            }
        case 'HIDE_MODAL':
        case 'REDIRECT_PROFILE':
        case 'REDIRECT':
            return {
                ...state,
                modalType: null,
                modalProps: {},
            }
    }
    return state

}