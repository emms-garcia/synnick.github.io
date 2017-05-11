import React from 'react';
import PropTypes from 'prop-types';

import RepoCard from './RepoCard';

const RepoGrid = ({ repos }) => {
    return (
        <div className='repo-grid'>
            <div className='row'>
                {
                    repos.map((repo) => (
                        <RepoCard
                            key={repo.id}
                            repo={repo}
                        />
                    ))
                }
            </div>
        </div>
    );
};

RepoGrid.propTypes = {
    repos: PropTypes.array.isRequired,
};

export default RepoGrid;
