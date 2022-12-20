import { useReducer } from 'react';

export const REDO = 'REDO';
export const actionRedo = () => ({ type: REDO });

export const UNDO = 'UNDO';
export const actionUndo = () => ({ type: UNDO });

export const RESET_HISTORY = 'RESET_HISTORY';
export const actionResetHistory = () => ({ type: RESET_HISTORY });

export function getUndofiedInitialState(initialState) {
  return {
    ...initialState,
    stateHistory: [initialState], // contiendra tout les évolutions de state
    statePosition: 0, //  c'est la position du state actuelle dans le stateHistory, 0 symbolise le state actuelle, 1 la dernière modification, etc
    // exemple: si on fait 2 UNDO, le statePosition=2, et on choisi le state en cours: stateHistory[2]
    undoEnabled: false, // pour savoir si on peut afficher le bouton undo
    redoEnabled: false, // pour savoir si on peut afficher le bouton redo
  };
}

export function getUndofiedReducer(reducer) {
  // on créer un nouveau reducer autour du reducer classic, pour ajouter le undo/redo sans tout modifier
  return (state, action) => {
    switch (action.type) {
      case UNDO: {
        const statePosition = state.statePosition + 1; // on augmente de +1 dans la position
        if (statePosition >= state.stateHistory.length) {
        // si on est au bout de l'historique du state on s'arrete là
          return state;
        }

        return {
          ...state.stateHistory[statePosition], // on envoie le nouveau state
          stateHistory: state.stateHistory, // on concerve l'historique
          statePosition, // on stocke la nouvelle position
          undoEnabled: statePosition < state.stateHistory.length - 1, // on peut encore faire un undo si on a pas atteint le max de l'historique
          redoEnabled: true, // on peut faire un redo car on viens de faire un undo
        };
      }

      case REDO: {
        const statePosition = state.statePosition - 1; // on descends de -1 dans la position
        if (statePosition < 0) {
        // si on est au minimum on reste là
          return state;
        }

        return {
          ...state.stateHistory[statePosition], // on envoie le nouveau state
          stateHistory: state.stateHistory, // on concerve l'historique
          statePosition, // on stocke la nouvelle position
          undoEnabled: true, // on peut faire un undo car on viens de faire un redo
          redoEnabled: statePosition > 0, // on peut encore faire un redo si on a pas atteint le 1er element
        };
      }

      case RESET_HISTORY: {
        return {
          ...state,
          stateHistory: [{ // on ajoute le state, au sommet du tableau
            ...state,
            stateHistory: undefined, // mais on pense bien à supprimer le stateHistory, pour ne pas le stocker dans lui même
          }],
          statePosition: 0,
          undoEnabled: false,
          redoEnabled: false,
        };
      }
      default: {
      // on est pas en undo redo, on demande au reducer classic
        const newState = reducer(state, action);

        return {
          ...newState,
          statePosition: 0, // comme le user à modifier le state on reset la position
          stateHistory: [ // a chaque modification on ajoute le state en cours au tableau d'historique
            { // on ajoute le nouveau state, au sommet du tableau
              ...newState,
              stateHistory: undefined, // mais on pense bien à supprimer le stateHistory, pour ne pas le stocker dans lui même
            },
            ...state.stateHistory.slice(newState.statePosition, 200),
          // on pars de la position actuelle (si il avait fait un undo), et on ne prends que les 200 premiers elements pour ne pas avoir un tableau d'historique trop grands
          ],
          undoEnabled: true,
          redoEnabled: false,
        };
      }
    }
  };
}

function useUndoReducer(reducer, initialState) {
  const [state, dispatch] = useReducer(
    getUndofiedReducer(reducer),
    getUndofiedInitialState(initialState),
  );

  return [
    {
      ...state,
      statePosition: undefined,
      stateHistory: undefined,
      undoEnabled: undefined,
      redoEnabled: undefined,
    },
    dispatch,
    {
      statePosition: state.statePosition,
      stateHistory: state.stateHistory,
      undoEnabled: state.undoEnabled,
      redoEnabled: state.redoEnabled,
    },
  ];
}

export default useUndoReducer;
