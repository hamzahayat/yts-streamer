//Declare Imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Button from 'material-ui/Button';
import MovieData from './MovieData';

//Declare Variables
const $ = require('jquery');
const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
  },
  button: {
    margin: theme.spacing.unit,
  },
  inputLabel:{
    color: '#F44336',
  }
});
class App extends Component {

  //Declare Constructor
  constructor(props) {
    super(props);

    //Declare state
    this.state = {
      value: '',
      urlSearch: '',
      status: '',
      data: {
        old: null,
        current: null
      }
    };

    //Bind Methods
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleJSON = this.handleJSON.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  componentDidMount() {

    //Declare Base API Url
    this.apiUrl = 'https://yts.ag/api/v2/list_movies.json?query_term=';

    //Setup Ajax Request
    $.ajaxSetup({
      dataType: 'json',
      cache: false,
      type: 'GET',
      global: false,
      timeout: 60000,
      success: this.handleJSON,
      error: this.handleError
    });
  }

  handleChange(event) {

    var val = event.target.value;

    this.setState((prevState) =>{
      return{
        value: val,
        urlSearch: this.apiUrl + encodeURIComponent(val),
        data: {
          old: prevState.data.current,
          current: prevState.data.current
        }
      };

    });
  }

  handleSearch(event) {
    event.preventDefault();

    //Make Ajax Call
    $.ajax({ url: this.state.urlSearch });
  }

  handleJSON(json) {
    this.setState((prevState) => {
      return {data:{
        old: prevState.data.current,
        current: json.data},
      status: 'success'};
    });
  }

  handleError(xhr, textStatus, errorThrown) {
    this.setState({
      status: 'error'
    });
  }

  render() {

    //Declare Props
    const { classes } = this.props;

    return (
      <div>
        <div>
          <FormControl className={this.props.classes.formControl}>
            <InputLabel htmlFor='search-input' className={this.props.classes.inputLabel} >Search Movie</InputLabel>
            <Input id='search-input' className= {this.props.classes.input} value={this.state.value} onChange={this.handleChange} />
          </FormControl>
          <Button variant="raised" className={this.props.classes.button} onClick={this.handleSearch} >Search</Button>
        </div>
        {this.state.data.current === this.state.data.old ? null: <MovieData data= {this.state.data.current}/>}
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);