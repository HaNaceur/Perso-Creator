import { useState } from 'react';
import uniqid from 'uniqid';
import CharacterForm from '../CharacterForm/CharacterForm';
import CharacterList from '../CharactersList/CharacterList';
import PetForm from '../PetForm/PetForm';
import './App.scss';

function App() {
  const [characters, setCharacters] = useState([]);

  const handleCreateCharacter = (character) => {
    console.log('dans app, voici le character', character);
    setCharacters([
      ...characters,
      {
        ...character,
        id: uniqid(), // comme on a pas de backend on s'occupe nous même de créer un id
      },
    ]);
  };

  return (
    <div className="App rpgui-content">
      <CharacterList characters={characters} />
      <CharacterForm onCreateCharacter={handleCreateCharacter} />
      <PetForm />
    </div>
  );
}

export default App;
