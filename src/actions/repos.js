import { fetchRepos } from '../utils/githubAPI';

export const RECEIVED_REPOS = 'RECEIVED_REPOS';

const receiveRepos = (repos) => {
    return {
        type: RECEIVED_REPOS,
        payload: { repos },
    };
};

export const fetchGithubRepos = (userName) => {
    return (dispatch) => {
        return fetchRepos(userName).then(
            (repos) => dispatch(receiveRepos(repos))
        ).catch(() => dispatch(receiveRepos([])));
    };
};
