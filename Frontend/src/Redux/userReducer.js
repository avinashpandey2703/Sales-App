// Define initaill state
const InitialState = {
    user: {}
}
// userReducer is function it take two parameter it state and 2 nd is action
export const userReducer = (state = InitialState, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state, user: action.payload
            }
        case "LOGOUT":
            return InitialState
        default:
            return InitialState;

    }
}