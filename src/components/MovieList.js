// Imports
import React, { Component } from 'react';

// Import Material-UI and Other Components
import { Card, CardMedia } from 'material-ui/Card';
import Movie from './Movie';

// Define Material-UI Component Styles
const style = {
  img: {
    height: 315,
    width: 210,
  },
};

class MovieList extends Component {
  // Define Constructor
  constructor(props) {
    super(props);

    // Declare State
    this.state = {
      modalOpen: false,
      selectedMovie: null,
    };

    // Bind Function
    this.handleModal = this.handleModal.bind(this);
  }

  handleModal() {
    this.setState(prevState => ({
      modalOpen: !prevState.modalOpen,
    }));
  }

  render() {
    // Declare State
    const { selectedMovie } = this.state;

    // Map Results from Props
    const results = this.props.results.map(movie => (
      <div className="card-movie" key={movie.id}>
        <Card
          onClick={() => {
            this.setState(prevState => ({
              modalOpen: !prevState.modalOpen,
              selectedMovie: movie,
            }));
          }}
        >
          <CardMedia>
            <img style={style.img} src={movie.large_cover_image} alt="movie" />
          </CardMedia>
        </Card>
      </div>
    ));

    return (
      <div>
        <div className="cards-list">{results}</div>

        {selectedMovie ? (
          <Movie
            modalOpen={this.state.modalOpen}
            selectedMovie={selectedMovie}
            handleModal={this.handleModal}
          />
        ) : null}
      </div>
    );
  }
}

export default MovieList;
