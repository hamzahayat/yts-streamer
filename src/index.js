// Import React Objects
import React from 'react';
import ReactDOM from 'react-dom';

// Import Material UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// Import App Object
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

// Initialize App Component
const Home = () => (
  <MuiThemeProvider>
    <App />
  </MuiThemeProvider>
);

// Render App
ReactDOM.render(<Home />, document.getElementById('root'));
registerServiceWorker();
