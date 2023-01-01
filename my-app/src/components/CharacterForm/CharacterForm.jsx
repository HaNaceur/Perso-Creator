
import React, { useContext } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Undo from 'pixelarticons/svg/undo.svg';
import Redo from 'pixelarticons/svg/redo.svg';

import DropdownRpg from '../DropdownRpg/DropdownRpg';
import RadiosButtonsRpg from '../RadiosButtonsRpg/RadiosButtonsRpg';
import useCharacterReducer, {
  actionReset, actionSetField, actionRandom, actionRedo, actionUndo, actionResetHistory,
} from '../../hooks/useCharacterReducer';

import classes from '../../data/classes';
import races from '../../data/races';

import './styles.scss';
import gender from '../../data/gender';
import CharacterContext from '../../contexts/CharactersContext';

function CharacterForm() {
  const contextValue = useContext(CharacterContext);
  const [state, dispatch, { undoEnabled, redoEnabled }] = useCharacterReducer();

  const handleSubmit = (e) => {
    e.preventDefault();
    contextValue.addCharacter(state);

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
        <h1 className="title">Character creator</h1>
        <hr className="golden" />
      </header>
      <div className="btn-container">
        <button
          type="button"
          className="rpgui-button"
          onClick={() => dispatch(actionRandom())}
        >
          <p>Random</p>
        </button>
        <button
          type="button"
          className="rpgui-button"
          onClick={() => dispatch(actionReset())}
        >
          <p>Reset</p>
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <Grid>
          <Row>
            <Col xs={12} md={6}>
              <label>
                LastName:
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
                Name:
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
                label="Gender:"
                value={state.gender}
                onChange={(value) => dispatch(actionSetField('gender', value))}
                options={gender}
              />
            </Col>
            <Col xs={12} md={6}>
              <label>
                Money
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
                Biography:
                <textarea
                  rows={5}
                  placeholder="Once upon a time..."
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
            <p>Create</p>
          </button>
        </div>
      </form>
    </div>
  );
}
CharacterForm.propTypes = {
};

CharacterForm.defaultProps = {};

export default React.memo(CharacterForm);