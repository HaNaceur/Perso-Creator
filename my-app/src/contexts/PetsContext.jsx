import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import uniqid from 'uniqid';

export const defaultValue = {
  pets: [],
  addPet: () => {},
};

// eslint-disable-next-line import/prefer-default-export
const PetContext = React.createContext(defaultValue);

export function PetContextProvider({ children }) {
  const [pets, setPets] = useState([]);

  const addPet = useCallback((character) => {
    setPets((oldPets) => [
      ...oldPets,
      {
        ...character,
        id: uniqid(), 
      },
    ]);
  }, []);

  const contextValue = useMemo(() => ({
    pets: pets,
    addPet,
  }), [pets, addPet]);

  return (
    <PetContext.Provider value={contextValue}>
      {children}
    </PetContext.Provider>
  );
}
PetContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};


export default PetContext;