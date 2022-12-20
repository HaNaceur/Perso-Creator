import classes from '../data/classes';
import gender from '../data/gender';
import races from '../data/races';
import { getRandomItem, getRandomNumber } from '../tools/random';

import useUndoReducer from './useUndoReducer';

export { actionUndo, actionRedo, actionResetHistory } from './useUndoReducer';

export const SET_FIELD = 'SET_FIELD';
export const actionSetField = (name, value) => ({ type: SET_FIELD, payload: { name, value } });

export const RESET = 'RESET';
export const actionReset = () => ({ type: RESET });

export const RANDOM = 'RANDOM';
export const actionRandom = () => ({ type: RANDOM });

export const characterInitialState = {
  firstName: '',
  lastName: '',
  race: races[0].value,
  classes: classes[0].value,
  gender: gender[0].value,
  money: 20,
  biography: '',
};

function characterReducer(state, action) {
  switch (action.type) {
    case RESET: {
      return {
        ...characterInitialState,
      };
    }
    case SET_FIELD: {
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    }
    case RANDOM: {
      return {
        ...state,
        firstName: getRandomItem(['Baldur', 'Gnarox', 'Gueilda', 'Ytrasil', 'Carol']),
        lastName: getRandomItem(['Fhusr', 'Lebon', 'Xfsil', 'Thedra-sild', 'Mopfsil']),
        race: getRandomItem(races).value,
        classes: getRandomItem(classes).value,
        gender: getRandomItem(gender).value,
        money: getRandomNumber(0, 100),
        // eslint-disable-next-line max-len
        biography: "Faut faire un feu en forme de cercle autour d'eux, comme ça ils se suicident, pendant que nous on fait le tour, et on lance de la caillasse de l'autre côté pour brouiller. Non? Moi j’appelle ça des politesses! Alors dites vous que c’est un combat réel et montrez-moi ce que vous avez dans l’slibard! Moi j’appelle ça des politesses!",
      };
    }
    default: {
      throw new Error('action not recognized');
    }
  }
}

function useCharacterReducer() {
  const [state, dispatch, undoOptions] = useUndoReducer(characterReducer, characterInitialState);

  return [state, dispatch, undoOptions];
}

export default useCharacterReducer;
