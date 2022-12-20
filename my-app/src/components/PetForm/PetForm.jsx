import React, { useReducer } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import DropdownRpg from '../DropdownRpg/DropdownRpg';

import pets from '../../data/pets';

import './styles.scss';

const initialState = {
  name: '',
  type: pets[0].value,
};

const SET_FIELD = 'SET_FIELD';
const actionSetField = (name, value) => ({ type: SET_FIELD, payload: { name, value } });

function reducer(state, action) {
  switch (action.type) {
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
    <div className="rpgui-container framed petForm">
      <form>
      <h1 className="title">Createur de famillier</h1>
        <hr className="golden" />
        <Grid>
          <Row>
            <Col xs={12} md={6}>
              <label>
                Prénom:
                <input
                  placeholder="Hedwige..."
                  type="text"
                  value={state.name}
                  onChange={(e) => dispatch(actionSetField('name', e.target.value))}
                />
              </label>
            </Col>
            <Col xs={12} md={6}>
              <DropdownRpg
                label="Type:"
                value={state.type}
                onChange={(value) => dispatch(actionSetField('type', value))}
                options={pets}
              />
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
PetForm.propTypes = {};

PetForm.defaultProps = {};

export default React.memo(PetForm);
