import React from 'react';
import PropTypes from 'prop-types';

import RepoCard from './RepoCard';
import Search from './Search';

class RepoGrid extends React.Component {
    constructor (props) {
        super(props);
        this.state = { searchValue: '' };
    }

    render () {
        const { repos } = this.props;
        const { searchValue } = this.state;

        const filteredRepos = Search.filterItems(
            Object.values(repos),
            searchValue,
            ['description', 'html_url', 'name']
        );

        return (
            <div className='repo-grid'>
                <Search
                    searchValue={searchValue}
                    onSearch={(search) => this.setState({ searchValue: search })}
                />
                <div className='row'>
                    {
                        filteredRepos.map((repo) => (
                            <RepoCard
                                key={repo.id}
                                repo={repo}
                            />
                        ))
                    }
                </div>
            </div>
        );
    }
}

RepoGrid.propTypes = {
    repos: PropTypes.object.isRequired,
};

export default RepoGrid;
