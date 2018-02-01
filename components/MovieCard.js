
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classnames from 'classnames';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import Collapse from 'material-ui/transitions/Collapse';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import red from 'material-ui/colors/red';
import PlayArrowIcon from 'material-ui-icons/PlayArrow';
import ShareIcon from 'material-ui-icons/Share';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';


const WebTorrent = require('webtorrent');
const $ = require('jquery');
const client = new WebTorrent();

const styles = theme => ({
    card: {
        maxWidth: 400,
    },
    media: {
        height: 194,
    },
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    flexGrow: {
        flex: '1 1 auto',
    },
    playIcon: {
        height: 38,
        width: 38,
    }
});

class MovieCard extends React.Component {

    //Declare Constructor
    constructor(props) {
        super(props);

        //Declare state
        this.state = {
            expanded: false,
            playVideo: false,
            video: null
        };

        //Bind Methods
        this.handleExpandClick = this.handleExpandClick.bind(this);
    }

    handleExpandClick() {
        this.setState({ expanded: !this.state.expanded });
    };

    handlePlayClick(movie){

        //Declare Variables
        var torrents= []
        
        //Loop through Movie Torrents
        movie.torrents.map(function (torrent, index){
            torrents.push(torrent);
        });

        client.add(torrents[0].url, (torrent)=>{
            var file = torrent.files.find(function (file) {
                return file.name.endsWith('.mp4')
            });

            file.appendTo('body');

            var video = file;
            console.log(file);
            
            this.setState({
                playVideo: true,
                video: video
            });
        });

    }

    render() {
        const { classes } = this.props;
        const movie = this.props.movie
        var movieAvatar = (movie.title).slice(0, 1);
        var movieSummary = (movie.summary).slice(0, 150);

        return (
            <div>
                <Card className={classes.card}>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="Recipe" className={classes.avatar} src={movie.small_cover_image} />
                        }
                        title={movie.title}
                        subheader={movie.year}
                    />
                    <CardMedia
                        className={classes.media} src={movie.large_cover_image}
                        image={movie.large_cover_image}
                        title={movie.title}
                    />
                    <CardContent>
                        <Typography component="p">
                            {movieSummary}...
                        </Typography>
                    </CardContent>
                    <CardActions disableActionSpacing >
                        <IconButton aria-label="Play/pause" onClick={this.handlePlayClick.bind(this, movie)}>
                            <PlayArrowIcon className={classes.playIcon} />
                        </IconButton>
                        <div className={classes.flexGrow} />
                        <IconButton
                            className={classnames(classes.expand, {
                                [classes.expandOpen]: this.state.expanded,
                            })}
                            onClick={this.handleExpandClick}
                            aria-expanded={this.state.expanded}
                            aria-label="Show more"
                        >
                            <ExpandMoreIcon />
                        </IconButton>
                    </CardActions>
                    <Collapse in={this.state.expanded} transitionDuration="auto" unmountOnExit>
                        <CardContent>
                            <Typography paragraph type="body2">
                                Summary:
                            </Typography>
                            <Typography paragraph>
                                {movie.summary}
                            </Typography>
                        </CardContent>
                    </Collapse>
                </Card>
                
            </div>
        );
    }
}

MovieCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MovieCard);