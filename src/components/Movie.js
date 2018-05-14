// Imports
import React, { Component } from 'react';

// Import Material-UI Components
import {
  Card,
  CardText,
  CardHeader,
  RaisedButton,
  Dialog,
  SelectField,
  MenuItem,
  IconButton,
  StepLabel,
} from 'material-ui';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import { yellow400, grey400 } from 'material-ui/styles/colors';

// Import Font Awesome Icons
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faImdb from '@fortawesome/fontawesome-free-brands/faImdb';
import { faStar, faPlay } from '@fortawesome/fontawesome-free-solid';

// Import Component
import Video from './Video';

// Define Material-UI Component Styles
const style = {
  dialog: {
    paddingBottom: 15,
  },
  dialogContent: {
    paddingBottom: 0,
  },
  synopsisTitle: {
    margin: 0,
    padding: '16px 0 5px 12px',
  },
  cardText: {
    margin: 0,
    paddingTop: '0px',
  },
  title: {
    marginBottom: 10,
    paddingBottom: 0,
  },
  rating: {
    marginLeft: 8,
  },
  starIcon: {
    marginLeft: 4,
  },
  closeIcon: {
    position: 'absolute',
    right: 0,
    top: 0,
    margin: 15,
  },
  button: {
    margin: 15,
  },
};

class Movie extends Component {
  constructor(props) {
    super(props);

    // Set State
    this.state = {
      menuOptionValue: 0,
      selectedMovieTorrent: null,
      videoPlayerOpen: false,
    };

    this.handleModal = this.handleModal.bind(this);
  }

  handleMoviePlay(event, selectedMovie) {
    // Grab Selected Quality Torrent
    let selectedMovieTorrent =
      selectedMovie.torrents[this.state.menuOptionValue].url;

    this.setState(prevState => ({
      selectedMovieTorrent,
      videoPlayerOpen: !prevState.videoPlayerOpen,
    }));
  }

  handleModal() {
    this.setState(prevState => ({
      videoPlayerOpen: !prevState.videoPlayerOpen,
    }));
  }

  render() {
    // Get Props
    const { selectedMovie, modalOpen, handleModal } = this.props;

    // Initialize Movie Details
    const MovieDetails = () => (
      <div>
        <FontAwesomeIcon icon={faImdb} size="2x" color={grey400} />
        <h4 className="movie-rating-item" style={style.rating}>
          {selectedMovie.rating}
          <FontAwesomeIcon
            icon={faStar}
            style={style.starIcon}
            color={yellow400}
          />
        </h4>
        <h4 className="movie-rating-item">{selectedMovie.year}</h4>
        <h4 className="movie-rating-item">{selectedMovie.runtime} min</h4>
      </div>
    );

    // Initalize Movie Synopsis
    const MovieSynopsis = () => (
      <Card zDepth={0} initiallyExpanded={true}>
        <CardHeader
          style={style.synopsisTitle}
          title="Synopsis"
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={true}>{selectedMovie.synopsis}</CardText>
      </Card>
    );

    const torrentMenuItem = selectedMovie.torrents.map((torrent, index) => (
      <MenuItem key={torrent.url} value={index} primaryText={torrent.quality} />
    ));

    // Initialize Movie Options
    const MovieOptions = () => (
      <Card zDepth={0} initiallyExpanded={true}>
        <CardHeader
          style={style.synopsisTitle}
          title="Movie Option"
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={true} style={style.cardText}>
          <SelectField
            floatingLabelText="Quality"
            value={this.state.menuOptionValue}
            onChange={(event, key, value) =>
              this.setState({
                menuOptionValue: value,
              })
            }
          >
            {torrentMenuItem}
          </SelectField>
        </CardText>
      </Card>
    );

    return (
      <div>
        <Dialog
          title={
            <div>
              <h2 style={style.title}>{selectedMovie.title}</h2>
              <IconButton style={style.closeIcon} onClick={handleModal}>
                <NavigationClose />
              </IconButton>
            </div>
          }
          titleStyle={style.title}
          style={style.dialog}
          bodyStyle={style.dialogContent}
          modal={false}
          onRequestClose={handleModal}
          open={modalOpen}
          autoScrollBodyContent={true}
          actions={
            <RaisedButton
              style={style.button}
              label="Play Movie"
              primary={true}
              icon={<FontAwesomeIcon icon={faPlay} />}
              onClick={this.handleMoviePlay.bind(this, event, selectedMovie)}
            />
          }
        >
          <MovieDetails />
          <MovieSynopsis />
          <MovieOptions />
        </Dialog>
        {this.state.videoPlayerOpen ? (
          <Video
            movie={selectedMovie}
            url={this.state.selectedMovieTorrent}
            videoPlayerOpen={this.state.videoPlayerOpen}
            handleModal={this.handleModal}
          />
        ) : null}
      </div>
    );
  }
}

export default Movie;
