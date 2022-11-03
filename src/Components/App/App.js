import React from 'react';
import './App.css';

import Searchbar from '../Searchbar/Searchbar'
import Searchresults from '../Searchresults/SearchResults';
import Playlist from "../Playlist/Playlist";

import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [],
      playListName: "My Playlist",
      playlistTracks: []
    }

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlayListName = this.updatePlayListName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (tracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }

    tracks.push(track);
    this.setState({ playlistTracks: tracks })

  }

  removeTrack(track) {
    // use track id to filter out of playlisttracks and set new state 
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);

    this.setState({ playlistTracks: tracks });
  }

  updatePlayListName(name) {
    this.setState({ playListName: name })
  }

  savePlaylist() {
    const trackUris = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlayList(this.state.playListName, trackUris).then(()=> {
      this.setState({
        playListName: "New Playlist",
        playlistTracks: []
      })
    })
  }

  search(term) {
    Spotify.search(term).then(searchResults => {
      this.setState({ searchResults: searchResults })
    })
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <Searchbar onSearch={this.search}/>
          <div className="App-playlist">
            <Searchresults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
            />
            <Playlist
              playListName={this.state.playListName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlayListName}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
