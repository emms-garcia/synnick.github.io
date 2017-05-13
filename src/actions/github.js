import { fetchRepos, fetchUser } from '../utils/githubAPI';

export const RECEIVED_REPOS = 'RECEIVED_REPOS';
export const RECEIVED_USER = 'RECEIVED_USER';

const receiveRepos = (repos) => {
    return {
        type: RECEIVED_REPOS,
        payload: { repos },
    };
};


const receiveUser = (user) => {
    return {
        type: RECEIVED_USER,
        payload: { user },
    };
};

export const fetchGithubRepos = (userName) => {
    return (dispatch) => {
        return fetchRepos(userName).then(
            (repos) => dispatch(receiveRepos(repos))
        ).catch(() => dispatch(receiveRepos([])));
    };
};

export const fetchGithubUser = (userName) => {
    return (dispatch) => {
        return fetchUser(userName).then(
            (user) => dispatch(receiveUser(user)),
            () => dispatch(receiveUser({}))
        );
    };
};
