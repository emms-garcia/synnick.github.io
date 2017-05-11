import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchGithubRepos } from '../actions/repos';
import { fetchGithubUser } from '../actions/user';

import Header from './Header';
import RepoGrid from './RepoGrid';

class App extends React.Component {
    constructor (props) {
        super(props);
        this.state = { loadingRepos: true, loadingUser: true };
    }

    componentDidMount() {
        const userName = 'synnick';
        this.props.dispatch(fetchGithubUser(userName)).then(() => {
            this.setState({ loadingUser: false });
        });
        this.props.dispatch(fetchGithubRepos(userName)).then(() => {
            this.setState({ loadingRepos: false });
        });
    }

    render () {
        return (
            <div className='container'>
                { this.renderUser() }
                { this.renderRepoGrid() }
            </div>
        );
    }

    renderRepoGrid () {
        if (this.state.loadingRepos) {
            return <h3>Loading Repositories...</h3>;
        } else if (Object.keys(this.props.repos).length === 0) {
            return <h3 className='error-message'>Could not fetch repos :(</h3>;
        }

        return <RepoGrid repos={this.props.repos} />;
    }

    renderUser () {
        let title;
        if (this.state.loadingUser) {
            title = 'Loading User...';
        } else if (Object.keys(this.props.user).length === 0) {
            title = 'Could not fetch user :(';
        } else {
            title = this.props.user.name;
        }

        return (
            <Header
                avatarUrl={this.props.user.avatar_url}
                subtitle='Powered by ReactJS'
                title={title}
            />
        );
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
