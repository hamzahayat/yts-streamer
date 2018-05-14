// Imports
import React, { Component } from 'react';
import MovieList from './MovieList';
import axios from 'axios';

// Import Material-UI Components
import Snackbar from 'material-ui/Snackbar';
import SearchBar from 'material-ui-search-bar-enhanced';
import IconButton from 'material-ui/IconButton';
import NextIcon from 'material-ui/svg-icons/image/navigate-next';
import BackIcon from 'material-ui/svg-icons/image/navigate-before';
import { grey600 } from 'material-ui/styles/colors';
import Movie from './Movie';

// Define API_URL
const API_URL = 'https://yts.ag/api/v2/list_movies.json';
let apiType;
let pageNumb = 1;

// Define Material-UI Component Styles
const style = {
  mediumIcon: {
    width: 48,
    height: 48,
  },
  medium: {
    width: 96,
    height: 96,
    padding: 24,
  },
};

class Search extends Component {
  // Define Constructor
  constructor(props) {
    super(props);

    // Declare State
    this.state = {
      query: '',
      noResults: false,
      snackbarText: '',
      disableNextBtn: false,
      disableBackBtn: false,
      resultPages: 0,
      totalEntries: 0,
      results: [],
      status: false,
    };

    // Bind Functions
    this.handleAPIRequest = this.handleAPIRequest.bind(this);
    this.handleOnRequestSearch = this.handleOnRequestSearch.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleBackClick = this.handleBackClick.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
  }

  componentWillMount() {
    // Request Movies
    this.handleAPIRequest(pageNumb);
  }

  handleAPIRequest(pageNumb) {
    // Handle API Request
    axios
      .get(`${API_URL}?query_term=${this.state.query}&page=${pageNumb}`)
      .then(({ data }) => {
        // Declare Movie Result Variable
        const resultsData = data.data;

        // Set Status State
        data.status === 'ok'
          ? this.setState({ status: true })
          : this.setState({
              noResults: true,
              snackbarText:
                'Database is currently experiencing technical issues. Try searching for a specific movie!',
            });

        this.setState({
          resultPages: parseInt(
            resultsData.movie_count / resultsData.limit,
            10,
          ),
          totalEntries: resultsData.movie_count,
        });

        // Set Resuts State
        if (resultsData.movie_count !== 0) {
          this.setState({ results: resultsData.movies });
        } else {
          this.setState({
            noResults: true,
            snackbarText: 'No movies found. Try again!',
          });
        }

        pageNumb > 1 ? window.scrollTo(0, 0) : null;
      });
  }

  handleOnRequestSearch() {
    //Reset Page Numb
    pageNumb = 1;
    this.handleAPIRequest(pageNumb);
  }

  handleClear() {
    // Go Back To Main Page
    this.handleOnRequestSearch();
  }

  handleRequestClose() {
    // Set State When Snackbar Times out
    this.setState({
      noResults: false,
    });
  }

  handleNextClick() {
    // Increment Page Number Variable
    pageNumb++;

    // Make API Request
    this.handleAPIRequest(pageNumb);
  }
  handleBackClick() {
    // Decrement Page Number Variable
    pageNumb--;

    // Make API Request
    this.handleAPIRequest(pageNumb);
  }

  render() {
    // Retrieve Props
    const API_TYPE = this.props.API;
    

    return (
      <div>
        <SearchBar
          hintText="Search Movies"
          value={this.state.query}
          onChange={newValue => this.setState({ query: newValue })}
          onRequestSearch={this.handleOnRequestSearch}
          onClear={this.handleClear}
          style={{
            margin: '0 auto',
            maxWidth: 800,
          }}
        />
        <MovieList results={this.state.results} />

        {this.state.status && this.state.resultPages > 1 ? (
          <div className="nav-btns">
            <IconButton
              disabled={
                pageNumb === 1
                  ? !this.state.disableBackBtn
                  : this.state.disableBackBtn
              }
              iconStyle={style.mediumIcon}
              style={style.medium}
              onClick={this.handleBackClick}
            >
              <BackIcon color={grey600} />
            </IconButton>
            <IconButton
              disabled={
                pageNumb === this.state.resultPages
                  ? !this.state.disableNextBtn
                  : this.state.disableNextBtn
              }
              iconStyle={style.mediumIcon}
              style={style.medium}
              onClick={this.handleNextClick}
            >
              <NextIcon color={grey600} />
            </IconButton>
          </div>
        ) : null}

        <Snackbar
          style={{ textAlign: 'center' }}
          open={this.state.noResults}
          message={this.state.snackbarText}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    );
  }
}

export default Search;
