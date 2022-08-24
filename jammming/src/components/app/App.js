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
                    id: "1",
                    name: "Freedom",
                    artist: "George Michael",
                    album: "Wham Fantastic"
                },
                {
                    id: "2",
                    name: "Slow Day",
                    artist: "Bonjovie",
                    album: "Lyrical Myrical"
                },
                {
                    id: "3",
                    name: "Happy",
                    artist: "Farrel Williams",
                    album: "Just Farrel"
                }] 
        }
    }
    render() {
        return (
            <div>
                <h1>Ja<span class="highlight">mmm</span>ing</h1>
                <div class="App">
                    <SearchBar />
                    <div class="App-playlist">
                        <SearchResults searchResults={this.state.searchResults} />
                        <Playlist />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
