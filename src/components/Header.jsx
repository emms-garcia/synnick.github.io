import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ avatarUrl, subtitle, title }) => {
    return (
        <div className='header'>
            <div className='row'>
                <div className='col-md-6 title'>
                    {
                        !!avatarUrl &&
                        <img src={avatarUrl} />
                    }
                    <h1>{ title }</h1>
                </div>
                <div className='col-md-6 subtitle'>
                    <h3>{ subtitle }</h3>
                </div>
            </div>
            <hr />
        </div>
    );
};

Header.propTypes = {
    avatarUrl: PropTypes.string,
    subtitle: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
};

export default Header;
