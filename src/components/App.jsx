import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchGithubRepos } from '../actions/repos';

class App extends React.Component {
    constructor () {
        super();
        this.state = {};
    }

    componentDidMount() {
        this.props.dispatch(fetchGithubRepos('synnick'));
    }

    render () {
        return (
            <h1>Hello World!</h1>
        );
    }
};

App.propTypes = {
    dispatch: PropTypes.func,
    repos: PropTypes.object,
};


const mapStateToProps = ({ repos }) => {
    return { repos };
};

export default connect(mapStateToProps)(App);
