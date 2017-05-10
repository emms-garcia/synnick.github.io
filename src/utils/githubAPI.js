const baseUrl = 'https://api.github.com';

export const fetchRepos = (userName) => {
    return fetch(`${baseUrl}/users/${userName}/repos`).then((response) => {
        return response.json();
    });
};
