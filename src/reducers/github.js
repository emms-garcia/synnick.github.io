import { RECEIVED_REPOS, RECEIVED_USER } from '../actions/github';

const initialState = {
    repos: {},
    user: {},
};

export default (state = initialState, action) => {
    switch (action.type) {
        case RECEIVED_REPOS:
            const { repos } = action.payload;
            return {
                ...state,
                repos: repos.reduce((accumulator, repo) => {
                    accumulator[repo.id] = repo;
                    return accumulator;
                }, {}),
            };
        case RECEIVED_USER:
            const { user } = action.payload;
            return { ...state, user };
        default:
            return state;
    }
};
