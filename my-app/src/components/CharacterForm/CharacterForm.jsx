import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Undo from 'pixelarticons/svg/undo.svg';
import Redo from 'pixelarticons/svg/redo.svg';

import DropdownRpg from '../DropdownRpg/DropdownRpg';
import RadiosButtonsRpg from '../RadiosButtonRpg/RadiosButtonsRpg';
import useCharacterReducer, {
  actionReset, actionSetField, actionRandom, actionRedo, actionUndo, actionResetHistory,
} from '../../hooks/useCharacterReducer';

import classes from '../../data/classes';
import races from '../../data/races';

import './styles.scss';
import gender from '../../data/gender';

function CharacterForm({
  onCreateCharacter,
}) {
  const [state, dispatch, { undoEnabled, redoEnabled }] = useCharacterReducer();

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateCharacter(state);

    dispatch(actionReset());
    dispatch(actionResetHistory());
  };

  return (
    <div className="rpgui-container framed character-form">
      <header className="header">
        <div className="undo-redo-container">
          {undoEnabled && (
            <button
              type="button"
              className="btn-undo"
              onClick={() => dispatch(actionUndo())}
            >
              <img src={Undo} alt="undo" />
            </button>
          )}
          {redoEnabled && (
            <button
              type="button"
              className="btn-redo"
              onClick={() => dispatch(actionRedo())}
            >
              <img src={Redo} alt="redo" />
            </button>
          )}
        </div>
        <h1 className="title">Createur de personnage</h1>
        <hr className="golden" />
      </header>
      <div className="btn-container">
        <button
          type="button"
          className="rpgui-button"
          onClick={() => dispatch(actionRandom())}
        >
          <p>Aléatoire</p>
        </button>
        <button
          type="button"
          className="rpgui-button"
          onClick={() => dispatch(actionReset())}
        >
          <p>Reinitialiser</p>
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <Grid>
          <Row>
            <Col xs={12} md={6}>
              <label>
                Nom de famille:
                <input
                  type="text"
                  placeholder="Baldur..."
                  value={state.lastName}
                  onChange={(e) => dispatch(actionSetField('lastName', e.target.value))}
                />
              </label>
            </Col>
            <Col xs={12} md={6}>
              <label>
                Prénom:
                <input
                  placeholder="Minsc..."
                  type="text"
                  value={state.firstName}
                  onChange={(e) => dispatch(actionSetField('firstName', e.target.value))}
                />
              </label>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={6}>
              <DropdownRpg
                label="Race:"
                value={state.race}
                onChange={(value) => dispatch(actionSetField('race', value))}
                options={races}
              />
            </Col>
            <Col xs={12} md={6}>
              <DropdownRpg
                label="Classe:"
                value={state.classes}
                onChange={(value) => dispatch(actionSetField('classes', value))}
                options={classes}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={6} className="gender-container">
              <RadiosButtonsRpg
                label="Genre:"
                value={state.gender}
                onChange={(value) => dispatch(actionSetField('gender', value))}
                options={gender}
              />
            </Col>
            <Col xs={12} md={6}>
              <label>
                Argent
                <input
                  type="number"
                  value={state.money}
                  onChange={(e) => dispatch(actionSetField('money', Number(e.target.value)))}
                />
              </label>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <label>
                Biographie:
                <textarea
                  rows={5}
                  placeholder="il était une fois..."
                  value={state.biography}
                  onChange={(e) => dispatch(actionSetField('biography', e.target.value))}
                />
              </label>
            </Col>
          </Row>
        </Grid>
        <div className="submit-button-container">
          <button
            type="submit"
            className="rpgui-button golden"
          >
            <p>Créer</p>
          </button>
        </div>
      </form>
    </div>
  );
}
CharacterForm.propTypes = {
  onCreateCharacter: PropTypes.func.isRequired,
};

CharacterForm.defaultProps = {};

export default React.memo(CharacterForm);
