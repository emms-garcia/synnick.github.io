import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ loading, user }) => {
    const avatarUrl = user.avatar_url;
    return (
        <div className='header'>
            <div className='row'>
                <div className='col-md-6 title'>
                    {
                        !!avatarUrl &&
                        <img src={avatarUrl} />
                    }
                    <h1>
                        {
                            user.name || (
                                loading ? 'Loading User...' :
                                'Could not fetch user :('
                            )
                        }
                    </h1>
                </div>
                <div className='col-md-6 subtitle'>
                    <h3>{ 'Powered by ReactJS' }</h3>
                </div>
            </div>
            <hr />
        </div>
    );
};

Header.propTypes = {
    loading: PropTypes.bool,
    user: PropTypes.object.isRequired,
};

export default Header;
