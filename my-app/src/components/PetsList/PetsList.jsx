
import React, { useContext } from 'react';
import PetContext from '../../contexts/PetsContext';

import './styles.scss';

function PetsList() {
  const contextValue = useContext(PetContext);
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
PetsList.propTypes = {};

PetsList.defaultProps = {};

export default React.memo(PetsList);