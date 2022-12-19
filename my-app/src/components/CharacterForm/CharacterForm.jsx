import React, { useReducer } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';

import './styles.scss';

const initialState = {
  firstName: '',
  lastName: '',
};

const SET_FIRSTNAME = 'SET_FIRSTNAME';
const SET_LASTNAME = 'SET_LASTNAME';

function reducer(state, action) {
  switch (action.type) {
    case SET_FIRSTNAME:
      return {
        ...state,
        firstName: action.payload,
      };
    case SET_LASTNAME:
      return {
        ...state,
        lastName: action.payload,
      };
    default: {
      throw new Error('action not recognized');
    }
  }
}

function CharacterForm() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="rpgui-container framed character-form">
      <h1>Createur de personnage</h1>
      <hr />
      <form>
        <Grid>
          <Row>
            <Col xs={12} md={6}>
              <label>
                Nom de famille:
                <input
                  type="text"
                  placeholder="..."
                  value={state.lastName}
                  onChange={(e) => dispatch({ type: SET_LASTNAME, payload: e.target.value })}
                />
              </label>
            </Col>
            <Col xs={12} md={6}>
              <label>
                Prénom:
                <input
                  placeholder="..."
                  type="text"
                  value={state.firstName}
                  onChange={(e) => dispatch({ type: SET_FIRSTNAME, payload: e.target.value })}
                />
              </label>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={6}>
              <label htmlFor="race">Race:</label>
              <select id="race" className="rpgui-dropdown">
                <option value="humain">Humain</option>
                <option value="elfe">Elfe</option>
                <option value="nain">Nain</option>
                <option value="orc">Orc</option>
                <option value="gobelin">Gobelin</option>
                <option value="tauren">Tauren</option>
                <option value="gnome">Gnome</option>
                <option value="harpie">Harpie</option>
                <option value="centaure">Centaure</option>
              </select>
            </Col>
            <Col xs={12} md={6}>
              <label htmlFor="class">Classe:</label>
              <select id="class" className="rpgui-dropdown">
                <option value="magicien">Magicien</option>
                <option value="guerrier">Guerrier</option>
                <option value="barde">Barde</option>
                <option value="inquisiteur">Inquisiteur</option>
                <option value="voleur">Voleur</option>
                <option value="druide">Druide</option>
                <option value="archer">Archer</option>
                <option value="paladin">Paladin</option>
                <option value="assassin">Assassin</option>
              </select>
            </Col>
          </Row>
        </Grid>
      </form>
    </div>
  );
}
CharacterForm.propTypes = {};

CharacterForm.defaultProps = {};

export default React.memo(CharacterForm);
