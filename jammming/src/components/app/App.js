import React from 'react';
import './App.css';
import SearchBar from '../searchbar/SearchBar';
import SearchResults from '../searchresults/SearchResults';
import Playlist from '../playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends React.Component {
    constructor(props){
        super(props);

        this.state = { 
            searchResults : [],
            playlistName : 'Default',
            playlistTracks : [],
        }
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.updatePlaylistName = this.updatePlaylistName.bind(this);
        this.savePlayList = this.savePlayList.bind(this);
        this.search = this.search.bind(this);
    }

    addTrack(track){
        if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)){
          return;
        }
        this.state.playlistTracks.push(track);
        this.setState({ playlistTracks : this.state.playlistTracks });
    }

    removeTrack(track) {
        this.state.playlistTracks = this.state.playlistTracks.filter(savedTrack => savedTrack.id !== track.id);
        this.setState({ 
            playlistTracks: this.state.playlistTracks
        }); 
    }

    updatePlaylistName(name){
        this.setState({ 
            playlistName: name
        });
    }

    savePlayList(){
        const trackURIs = this.state.playlistTracks.map(track => track.uri);
        Spotify.savePlayList(this.state.playlistName, trackURIs).then(() => {
            this.updatePlaylistName('New Playlist');
            document.getElementById('playlist-name').value = 'New Playlist';
            this.setState({
                playlistTracks: []
            });
        });
    }

    search(term){
        Spotify.search(term).then(searchResults => {
                                this.setState({
                                        searchResults : searchResults
                                })
        });
    }

    render() {
        return (
            <div>
                <h1>Ja<span class="highlight">mmm</span>ing</h1>
                <div class="App">
                    <SearchBar onSearch={this.search} />
                    <div class="App-playlist">
                        <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
                        <Playlist playlistName={this.state.playlistName} 
                                  playlistTracks={this.state.playlistTracks} 
                                  onRemove={this.removeTrack} 
                                  onNameChange={this.updatePlaylistName} 
                                  onSave={this.savePlayList} />
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount(){
        Spotify.getAccessToken();
    }
}

export default App;
