const baseUrl = 'https://api.github.com';

export const fetchUser = (userName) => {
    return fetch(`${baseUrl}/users/${userName}`).then((response) => {
        return response.json();
    });
};

export const fetchRepos = (userName) => {
    return fetch(`${baseUrl}/users/${userName}/repos`).then((response) => {
        return response.json();
    });
};
