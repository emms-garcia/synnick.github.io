import React from 'react';
import PropTypes from 'prop-types';

import { Search, Select } from './common';
import RepoCard from './RepoCard';

class RepoGrid extends React.Component {
    constructor (props) {
        super(props);
        this.state = { limitValue: 6, searchValue: '' };
    }

    render () {
        if (Object.keys(this.props.repos).length === 0) {
            return (
                <h3 className='error-message'>
                    Could not fetch repos :(
                </h3>
            );
        }
        const { repos } = this.props;
        const { limitValue, searchValue } = this.state;
        const filteredRepos = Search.filterItems(
            Object.values(repos),
            searchValue,
            ['description', 'html_url', 'name']
        );

        return (
            <div className='repo-grid'>
                <div className='row repo-filters'>
                    <div className='col-md-4'>
                        <Search
                            searchValue={searchValue}
                            onSearch={(search) => this.setState({ searchValue: search })}
                        />
                    </div>
                    <div className='col-md-4 col-md-offset-4'>
                        <Select
                            onChange={(limit) => this.setState({ limitValue: limit })}
                            options={[
                                { label: 'Limit to 3 repos', value: 3 },
                                { label: 'Limit to 6 repos', value: 6 },
                                { label: 'Limit to 9 repos', value: 9 },
                                { label: 'Show all repos', value: filteredRepos.length },
                            ]}
                            value={limitValue}
                        />
                    </div>
                </div>
                <div className='row'>
                    {
                        filteredRepos.splice(0, limitValue).map((repo) => (
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
