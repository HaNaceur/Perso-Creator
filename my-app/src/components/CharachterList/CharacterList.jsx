import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

function CharacterList({
  characters,
}) {
  return (
    <div>
      {characters.map(({ id, lastName, firstName }) => (
        <div
          key={id}
          className="rpgui-container framed-golden"
        >
          {lastName} {firstName}
        </div>
      ))}
    </div>
  );
}
CharacterList.propTypes = {
  characters: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string,
  })).isRequired,
};

CharacterList.defaultProps = {};

export default React.memo(CharacterList);
