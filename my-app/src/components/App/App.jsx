import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import CharacterForm from '../CharacterForm/CharacterForm';
import CharactersList from '../CharactersList/CharactersList';
import PetForm from '../PetForm/PetForm';
import './App.scss';

function App() {
  return (
    <div className="App rpgui-content">
      <Row between="xs">
        <Col xs={12} md={5} lg={3}>
          <CharactersList />
        </Col>
        <Col xs={12} md={7} lg={9}>
          <CharacterForm />
          <PetForm />
        </Col>
      </Row>
    </div>
  );
}

export default React.memo(App);