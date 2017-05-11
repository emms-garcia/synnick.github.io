import React from 'react';
import PropTypes from 'prop-types';

const RepoCard = ({ repo }) => {
    return (
        <div className='repo-card'>
            <div
                className='repo-card-inner'
                onClick={() => { window.location.href = repo.html_url }}
            >
                <p className='repo-name'>{ repo.name }</p>
                <p className='repo-description'>
                    { repo.description || 'No Description Provided...' }
                </p>
                <p className='repo-language'>{ repo.language }</p>
                <a className='repo-url' href={repo.html_url}>{ repo.html_url }</a>
            </div>
        </div>
    );
};

RepoCard.propTypes = {
    repo: PropTypes.object.isRequired,
};

export default RepoCard;
