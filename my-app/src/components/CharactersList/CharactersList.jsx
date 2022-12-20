
import React, { useContext } from 'react';
import CharacterContext from '../../contexts/CharactersContext';

import './styles.scss';

function CharactersList() {
  const contextValue = useContext(CharacterContext);
  console.log(contextValue);

  return (
    <div className="characters-list">
      {contextValue.characters.map(({ id, lastName, firstName }) => (
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
CharactersList.propTypes = {};

CharactersList.defaultProps = {};

export default React.memo(CharactersList);