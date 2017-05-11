import React from 'react';
import PropTypes from 'prop-types';

import Limit from './Limit';
import RepoCard from './RepoCard';
import Search from './Search';

class RepoGrid extends React.Component {
    constructor (props) {
        super(props);
        this.state = { limitValue: 9, searchValue: '' };
    }

    render () {
        const { repos } = this.props;
        const { limitValue, searchValue } = this.state;

        const filteredRepos = Search.filterItems(
            Object.values(repos),
            searchValue,
            ['description', 'html_url', 'name']
        );

        return (
            <div className='repo-grid'>
                <div className='row filtering-tools'>
                    <div className='col-md-4'>
                        <Search
                            searchValue={searchValue}
                            onSearch={(search) => this.setState({ searchValue: search })}
                        />
                    </div>
                    <div className='col-md-4 col-md-offset-4'>
                        <Limit
                            limitValue={limitValue}
                            onChange={(limit) => this.setState({ limitValue: limit })}
                            options={[
                                { label: 'Show 3 repos', value: 3 },
                                { label: 'Show 6 repos', value: 6 },
                                { label: 'Show 9 repos', value: 9 },
                                { label: 'Show all repos', value: filteredRepos.length },
                            ]}
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
