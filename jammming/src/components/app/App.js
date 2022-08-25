import React from 'react';
import './App.css';
import SearchBar from './../searchbar/SearchBar';
import SearchResults from './../searchresults/SearchResults';
import Playlist from './../playlist/Playlist';

class App extends React.Component {
    constructor(props){
        super(props);

        this.state = { 
            searchResults : [
                {
                    id: 1,
                    name: "Freedom",
                    artist: "George Michael",
                    album: "Wham Fantastic"
                },
                {
                    id: 2,
                    name: "Slow Day",
                    artist: "Bonjovie",
                    album: "Lyrical Myrical"
                },
                {
                    id: 3,
                    name: "Happy",
                    artist: "Farrel Williams",
                    album: "Just Farrel"
                }
            ],
            playlistName : "Coool vibes",
            playlistTracks : [
                {
                    id: 4,
                    name: "Bad Habits",
                    artist: "Ed Sheeran",
                    album: "Math Tour Set"
                },
                {
                    id: 5,
                    name: "another song",
                    artist: "Jimmy",
                    album: "Weird"
                },
                {
                    id: 6,
                    name: "Weird Al yankawitz",
                    artist: "Eat it",
                    album: "Mad Boys"
                }
            ],
        }
        this.addTrack = this.addTrack.bind(this);
    }

    addTrack(track){
        console.log("pigs");
        if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)){
          return;
        }
        this.state.playlistTracks.push(track);
        this.setState({ playlistTracks : this.state.playlistTracks });
    }
    render() {
        return (
            <div>
                <h1>Ja<span class="highlight">mmm</span>ing</h1>
                <div class="App">
                    <SearchBar />
                    <div class="App-playlist">
                        <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
                        <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
