import React from 'react';
import PropTypes from 'prop-types';

function RadiosButtonsRpg({
  label,
  value,
  onChange,
  options,
  ...rest
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
      {...rest}
    >
      {label && (
      <label>
        {label}
      </label>
      )}
      {options.map(({ value: valueOpt, label: labelOpt }) => (
        <React.Fragment key={valueOpt}>
          <input
            className="rpgui-radio"
            type="radio"
            value={valueOpt}
            checked={value === valueOpt}
            readOnly
          />
          <label
            onClick={() => onChange(valueOpt)}
          >
            {labelOpt || valueOpt}
          </label>
        </React.Fragment>
      ))}
    </div>
  );
}
RadiosButtonsRpg.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string.isRequired,
  })).isRequired,
};

RadiosButtonsRpg.defaultProps = {
  label: '',
};
export default React.memo(RadiosButtonsRpg);
