// Import React Objects
import React, { Component } from 'react';

// Import Material-Ui Componenets
import {
  BottomNavigation,
  BottomNavigationItem,
} from 'material-ui/BottomNavigation';
import MovieIcon from 'material-ui/svg-icons/maps/local-movies';
import TvIcon from 'material-ui/svg-icons/notification/live-tv';
import Paper from 'material-ui/Paper';

// Import Search Object
import Search from './Search';

class App extends Component {
  // Declare Constructor
  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: 0,
      API_TYPE: 'MOVIE',
    };
    this.select = this.select.bind(this);
  }

  select(index, selectedApi) {
    this.setState({ selectedIndex: index, apiType: selectedApi });
  }
  render() {
    return (
      <div>
        <h1 className="title">YTS Streamer</h1>
        <h3 className="subtitle">by Hamza Qaisrani</h3>
        <Search API={this.state.apiType} />
        <Paper zDepth={1} id="bottom-nav-bar">
          <BottomNavigation selectedIndex={this.state.selectedIndex}>
            <BottomNavigationItem
              label="Movies"
              icon={<MovieIcon />}
              onClick={() => this.select(0, 'MOVIE')}
            />
            <BottomNavigationItem
              label="TV Shows"
              icon={<TvIcon />}
              onClick={() => this.select(1, 'TV')}
            />
          </BottomNavigation>
        </Paper>
      </div>
    );
  }
}

export default App;
