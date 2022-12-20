import React from 'react';
import PropTypes from 'prop-types';

function DropdownRpg({
  label,
  value,
  onChange,
  options,
  ...rest
}) {
  return (
    <label>
      {label}
      <select
        className="rpgui-dropdown"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        {...rest}
      >
        {options.map(({ label: optLabel, value: optValue, ...optRest }) => (
          <option
            key={optValue}
            value={optValue}
            {...optRest}
          >{optLabel || optValue}
          </option>
        ))}
      </select>
    </label>
  );
}
DropdownRpg.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string.isRequired,
  })).isRequired,
};

DropdownRpg.defaultProps = {
  label: '',
};

export default React.memo(DropdownRpg);
