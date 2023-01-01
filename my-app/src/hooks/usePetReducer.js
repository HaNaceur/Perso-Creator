import pets from '../data/pets';

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
  Name: '',
};

function petReducer(state, action) {
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
        Name: getRandomItem(['Cat', 'Dog', 'Wolf', 'Dragon', 'Snake','Owl','Lion','Goat']),
    
        // eslint-disable-next-line max-len
      };
    }
    default: {
      throw new Error('action not recognized');
    }
  }
}

function usePetReducer() {
  const [state, dispatch, undoOptions] = useUndoReducer(petReducer, characterInitialState);

  return [state, dispatch, undoOptions];
}

export default usePetReducer;
