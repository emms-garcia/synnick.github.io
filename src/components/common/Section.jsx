import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const Section = ({ children, className, title }) => {
    return (
        <div className={classNames('section', className)}>
            <div className='row section-header'>
                <div className='col-md-12'>
                    <h2>{ title }</h2>
                    <hr />
                </div>
            </div>
            <div className='row section-content'>
                <div className='col-md-12'>
                    { children }
                </div>
            </div>
        </div>
    );
};

Section.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    subtitle: PropTypes.string,
    title: PropTypes.string.isRequired,
};

export default Section;
