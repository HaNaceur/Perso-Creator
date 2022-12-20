import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import uniqid from 'uniqid';

// la valeur par defaut du context. Mais il faut quand même préciser la props value dans le Provider
// cette variable est surtout utile en terme de documentation pour savoir qu'est ce qui est stocké dans le contexte
export const defaultValue = {
  characters: [],
  addCharacter: () => {},
};

// eslint-disable-next-line import/prefer-default-export
const CharacterContext = React.createContext(defaultValue);

export function CharacterContextProvider({ children }) {
  const [characters, setCharacters] = useState([]);

  const addCharacter = useCallback((character) => {
    setCharacters((oldCharacters) => [
      ...oldCharacters,
      {
        ...character,
        id: uniqid(), // comme on a pas de backend on s'occupe nous même de créer un id
      },
    ]);
  }, []);

  const contextValue = useMemo(() => ({
    characters: characters,
    addCharacter,
  }), [characters, addCharacter]);

  return (
    <CharacterContext.Provider value={contextValue}>
      {children}
    </CharacterContext.Provider>
  );
}
CharacterContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CharacterContext;