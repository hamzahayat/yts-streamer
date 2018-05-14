// Import React Objects
import React, { Component } from 'react';

// Import Material Ui Compoment
import { IconButton, Dialog } from 'material-ui';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

// Import Video Component
import { Player } from 'video-react';

// Import Web Torrent
import WebTorrent from 'webtorrent';
const client = new WebTorrent();

const style = {
  customContentStyle: {
    height: '100%',
  },
  title: {
    marginBottom: 10,
    paddingBottom: 0,
  },
  closeIcon: {
    position: 'absolute',
    right: 0,
    top: 0,
    margin: 15,
  },
};

class Video extends Component {
  // Declare Constructor
  constructor(props) {
    super(props);

    this.state = {
      video: null,
      torrent: null,
    };
  }

  componentDidMount() {
    let video;
    client.add(this.props.url, torrent => {
      video = torrent.files.find(function(file) {
        return file.name.endsWith('.mp4');
      });

      video.renderTo('.video-react-video');
      this.setState({
        video: video,
        torrent: torrent,
      });
    });
  }

  componentWillUnmount() {
    client.remove(this.state.torrent);
  }

  render() {
    const { videoPlayerOpen, movie, handleModal } = this.props;

    return (
      <div>
        <Dialog
          modal={true}
          title={
            <div>
              <h2 style={style.title}>{movie.title}</h2>
              <IconButton style={style.closeIcon} onClick={handleModal}>
                <NavigationClose />
              </IconButton>
            </div>
          }
          titleStyle={style.title}
          contentStyle={style.customContentStyle}
          open={videoPlayerOpen}
          onRequestClose={handleModal}
        >
          <Player />
        </Dialog>
      </div>
    );
  }
}

export default Video;
