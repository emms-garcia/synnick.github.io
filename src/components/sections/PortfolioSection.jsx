import React from 'react';
import PropTypes from 'prop-types';

import { Section } from '../common';
import RepoGrid from '../RepoGrid';

const PortfolioSection = ({ loading, repos }) => {
    let content;
    if (loading) {
        content = <h3>Loading Repositories...</h3>;
    } else if (Object.keys(repos).length === 0) {
        content = <h3 className='error-message'>Could not fetch repos :(</h3>;
    } else {
        content = <RepoGrid repos={repos} />;
    }

    return (
        <Section
            children={content}
            className='portfolio-section'
            title='Portfolio'
        />
    );
};

PortfolioSection.propTypes = {
    loading: PropTypes.bool,
    repos: PropTypes.object.isRequired,
};

export default PortfolioSection;
