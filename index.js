//Declare Imports
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import registerServiceWorker from './registerServiceWorker';

//Set Theme
const theme = createMuiTheme();

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <App />
    </MuiThemeProvider>,
    document.getElementById('root')
);
registerServiceWorker();