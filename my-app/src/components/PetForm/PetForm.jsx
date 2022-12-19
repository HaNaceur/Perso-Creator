import React, { useReducer } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';

import './styles.scss';

const initialState = {
  name: '',
  type: 'animal',
  genre:'' ,
  Argent:0 ,
  Histoire:'',
};

const SET_FIELD = 'SET_FIELD';
const actionSetField = (name, value) => ({ type: SET_FIELD, payload: { name, value } });

const RESET = 'RESET';
const actionReset = () => ({ type: RESET });

function reducer(state, action) {
  switch (action.type) {
    case RESET: {
      return initialState; // on reset le state au niveau initial
    }
    case SET_FIELD:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    default: {
      throw new Error('action not recognized');
    }
  }
}

function PetForm() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="rpgui-container framed character-form">
      <header className="header">
        <h1 className="title">Createur d'animal</h1>
        <hr className="golden" />
      </header>
      <div className="btn-reset-container">
        <button
          type="button"
          className="btn-reset rpgui-button"
          onClick={() => dispatch(actionReset())}
        >
          Reinitialiser
        </button>
      </div>
      <form>
        <Grid>
          <Row>
            <Col xs={12} md={6}>
              <label>
                Nom :
                <input
                  type="text"
                  placeholder="..."
                  value={state.lastName}
                  onChange={(e) => dispatch(actionSetField('Name', e.target.value))}
                />
              </label>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={6}>
              <label htmlFor="type">Type:</label>
              <select
                id="type"
                className="rpgui-dropdown"
                value={state.race}
                onChange={(e) => dispatch(actionSetField('type', e.target.value))}
              >
                <option value="chat">Chat</option>
                <option value="chien">Chien</option>
                <option value="loup">Loup</option>
                <option value="dragon">Dragon</option>
                <option value="serpent">Serpent</option>
                <option value="chouette">Chouette</option>
                <option value="lion">Lion</option>
                <option value="chèvre">Chèvre</option>
              </select>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={6}>
              <label htmlFor="type">Type:</label>
              <select
                id="type"
                className="rpgui-dropdown"
                value={state.race}
                onChange={(e) => dispatch(actionSetField('type', e.target.value))}
              >
                <option value="masculin">Masculin</option>
                <option value="feminin">Feminin</option>
              </select>
            </Col>
          </Row>
        </Grid>
      </form>
    </div>
  );
}
PetForm.propTypes = {};

PetForm.defaultProps = {};

export default React.memo(PetForm);
