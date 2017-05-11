import React from 'react';
import PropTypes from 'prop-types';

const Limit = ({ limitValue, onChange, options }) => {
    return (
        <div className='limit'>
            <select value={limitValue} onChange={(e) => onChange(parseInt(e.target.value))}>
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

Limit.propTypes = {
    limitValue: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired,
};

export default Limit;
