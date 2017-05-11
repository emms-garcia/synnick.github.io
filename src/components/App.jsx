import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchGithubRepos } from '../actions/repos';
import { fetchGithubUser } from '../actions/user';

import Search from './Search';
import Header from './Header';
import RepoGrid from './RepoGrid';

const userName = 'synnick';

class App extends React.Component {
    constructor (props) {
        super(props);
        this.state = { searchValue: '', loadingRepos: true };
    }

    componentDidMount() {
        this.props.dispatch(fetchGithubUser(userName));
        this.props.dispatch(fetchGithubRepos(userName)).then(() => {
            this.setState({ loadingRepos: false });
        });
    }

    render () {
        return (
            <div className='container'>
                <Header
                    subtitle='Powered by ReactJS'
                    title={this.props.user.name || 'Loading User...'}
                />
                <Search
                    searchValue={this.state.searchValue}
                    onSearch={(searchValue) => this.setState({ searchValue })}
                />
                { this.renderRepoGrid() }
            </div>
        );
    }

    renderRepoGrid () {
        if (this.state.loadingRepos) {
            return <h3>Loading Repositories...</h3>;
        }

        const filteredRepos = Search.filterItems(
            Object.values(this.props.repos),
            this.state.searchValue,
            ['description', 'html_url', 'name']
        );

        return <RepoGrid repos={filteredRepos} />;
    }
};

App.propTypes = {
    dispatch: PropTypes.func,
    repos: PropTypes.object,
    user: PropTypes.object,
};


const mapStateToProps = ({ repos, user }) => {
    return { repos, user };
};

export default connect(mapStateToProps)(App);
