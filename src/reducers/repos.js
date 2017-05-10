import { RECEIVED_REPOS } from '../actions/repos';

const initialState = {};

export default (state = initialState, action) => {
    switch (action.type) {
        case RECEIVED_REPOS:
            const { repos } = action.payload;
            return {
                ...repos.reduce((accumulator, repo) => {
                    accumulator[repo.id] = repo;
                    return accumulator;
                }, {}),
            };
        default:
            return state;
    }
};
