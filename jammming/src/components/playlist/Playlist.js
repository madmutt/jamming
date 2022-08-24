import './Playlist.css';
import TrackList from '../tracklist/TrackList';

function Playlist() {
    return (
        <div className="Playlist">
            <input defaultValue={'New Playlist'} />
            {/*<TrackList />*/}
            <button className="Playlist-save">SAVE TO SPOTIFY</button>
        </div>
    );
}

export default Playlist;
