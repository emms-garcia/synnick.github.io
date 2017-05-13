import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const Select = ({ className, selectedValue, onChange, options }) => {
    return (
        <div className={classNames('select', className)}>
            <select value={selectedValue} onChange={(e) => onChange(e.target.value)}>
                {
                    options.map(({ label, value }) => (
                        <option key={value} value={value}>
                            { label }
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
    selectedValue: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
};

export default Select;
