//Declare Imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MovieCard from './MovieCard';

//Declare Variable

class MovieData extends Component {

    //Declare Constructor
    constructor(props) {
        super(props);
    }

    render() {

        const jsonData = this.props.data;
        var movieCount = 0;
        var movies = null;
        if (jsonData != null) {
            if (jsonData.movie_count > 0) {
                movies = jsonData.movies;
                movieCount = jsonData.movie_count;
            } else {
                movieCount = 0;
            }
        }

        return (
            <div>
                {movies? movies.map(function (movie, index) {
                    return (
                        <div key={movie.id} >
                            <MovieCard movie={movie} />
                        </div>
                    );
                }): <p>No movies found</p>}
            </div>
        );

    }

}

export default MovieData;

