const baseUrl = 'https://api.github.com';

const handleErrors = (response) => {
    if (!response.ok) {
        throw Error(response.statusText);
    }

    return response;
};

export const fetchRepos = (userName) => {
    return fetch(`${baseUrl}/users/${userName}/repos`)
        .then(handleErrors)
        .then((response) => response.json())
        .catch(() => {});
};

export const fetchUser = (userName) => {
    return fetch(`${baseUrl}/users/${userName}`)
        .then(handleErrors)
        .then((response) => response.json())
        .catch(() => {});
};
