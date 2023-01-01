import React, { useReducer } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';

import DropdownRpg from '../DropdownRpg/DropdownRpg';
import RadiosButtonsRpg from '../RadiosButtonsRpg/RadiosButtonsRpg';
import usePetReducer, {
    actionReset, actionSetField, actionRandom, actionRedo, actionUndo, actionResetHistory,
  } from '../../hooks/usePetReducer';

import pets from '../../data/pets';
import PetContext from '../../contexts/CharactersContext';

import './styles.scss';

const initialState = {
  name: '',
  type: pets[0].value,
};

const SET_FIELD = 'SET_FIELD';
 actionSetField();

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
        <Grid>
          <Row>
            <Col xs={12} md={6}>
              <label>
                Name:
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
      </form>
    </div>
  );
}

PetForm.propTypes = {};

PetForm.defaultProps = {};

export default React.memo(PetForm);
