import ReactDOM from 'react-dom/client';

// import 'rpgui/rpgui';
import 'rpgui/rpgui.min.css';

import App from './components/App/App';
import { CharacterContextProvider } from './contexts/CharactersContext';
import { PetContextProvider } from './contexts/PetsContext';
import reportWebVitals from './reportWebVitals';
import './styles/index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // ici on passe le context à l'ensemble de notre application, et on lui passe sa valeur
  <CharacterContextProvider>
    <App />
  </CharacterContextProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
