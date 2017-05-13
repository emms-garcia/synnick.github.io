import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchGithubRepos, fetchGithubUser } from '../actions/github';

import Header from './Header';
import PortfolioSection from './sections/PortfolioSection';

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
                <Header
                    loading={this.state.loadingUser}
                    user={this.props.user}
                />
                <PortfolioSection
                    loading={this.state.loadingRepos}
                    repos={this.props.repos}
                />
            </div>
        );
    }
};

App.propTypes = {
    dispatch: PropTypes.func,
    repos: PropTypes.object,
    user: PropTypes.object,
};


const mapStateToProps = ({ github }) => {
    const { repos, user } = github;
    return { repos, user };
};

export default connect(mapStateToProps)(App);
