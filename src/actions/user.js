import { fetchUser} from '../utils/githubAPI';

export const RECEIVED_USER = 'RECEIVED_USER';

const receiveUser = (user) => {
    return {
        type: RECEIVED_USER,
        payload: { user },
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
