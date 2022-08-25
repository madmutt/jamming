import React from 'react';
import './TrackList.css';
import Track from '../track/Track';

class TrackList extends React.Component {
    render() {
        return (
            <div className="TrackList">
                {this.props.tracks.map((track) => {
                    return <Track key={track.id}
                                  track={track}
                                  name={track.name}
                                  artist={track.artist}
                                  album={track.album} 
                                  onAdd={this.props.onAdd} 
                                  isRemoval={false} />
                })}
            </div>
        );
    }
}

export default TrackList;
