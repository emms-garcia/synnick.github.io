import React from 'react';
import PropTypes from 'prop-types';

import { Section } from '../common';
import RepoGrid from '../RepoGrid';

const PortfolioSection = ({ loading, repos }) => {
    return (
        <Section className='portfolio-section' title='Portfolio'>
            {
                loading ? <h3>Loading Repositories...</h3> :
                <RepoGrid repos={repos} />
            }
        </Section>
    );
};

PortfolioSection.propTypes = {
    loading: PropTypes.bool,
    repos: PropTypes.object.isRequired,
};

export default PortfolioSection;
