import { useState } from 'react';
import uniqid from 'uniqid';
import { Grid, Row, Col } from 'react-flexbox-grid';
import CharacterForm from '../CharacterForm/CharacterForm';
import CharactersList from '../CharactersList/CharactersList';
import PetForm from '../PetForm/PetForm';
import './App.scss';

function App() {
  const [characters, setCharacters] = useState([]);

  const handleCreateCharacter = (character) => {
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
      <Row between="xs">
        <Col xs={12} md={5} lg={3}>
          <CharactersList characters={characters} />
        </Col>
        <Col xs={12} md={7} lg={9}>
          <CharacterForm onCreateCharacter={handleCreateCharacter} />
          <PetForm />
        </Col>
      </Row>
    </div>
  );
}

export default App;
