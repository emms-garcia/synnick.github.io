import { RECEIVED_USER } from '../actions/user';

const initialState = {};

export default (state = initialState, action) => {
    switch (action.type) {
        case RECEIVED_USER:
            const { user } = action.payload;
            return { ...user };
        default:
            return state;
    }
};
