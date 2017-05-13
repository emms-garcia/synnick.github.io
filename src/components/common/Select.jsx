import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const Select = ({ className, onChange, options, value}) => {
    return (
        <div className={classNames('select', className)}>
            <select value={value} onChange={(e) => onChange(e.target.value)}>
                {
                    options.map((option) => (
                        <option key={option.value} value={option.value}>
                            { option.label }
                        </option>
                    ))
                }
            </select>
        </div>
    );
};

Select.propTypes = {
    className: PropTypes.string,
    onChange: PropTypes.func,
    options: PropTypes.array.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
};

export default Select;
