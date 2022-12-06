import React, { useState } from 'react';

import './App.css';
import Playlist from '../Playlist/Playlist';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Spotify from '../../util/Spotify'

function App(props) {
  console.log('Hello, world!');
  const [state, setState] = useState(
    {
      searchResults: [
        // {
        //   name: "Fix You",
        //   artist: "Coldplay",
        //   album: "Viva La Vida",
        //   id: "1"
        // },
        // {
        //   name: "Lose Yourself",
        //   artist: "Eminem",
        //   album: "Relapse",
        //   id: "2"
        // }
      ],
      playlistName: "My Playlist",
      playlistTracks: [
        // {
        //   name: "Paradise",
        //   artist: "Coldplay",
        //   album: "Viva La Vida",
        //   id: "3"
        // },
        // {
        //   name: "Not Afraid",
        //   artist: "Eminem",
        //   album: "Relapse",
        //   id: "4"
        // }
      ]
    }
  )

  function addTrack(track) {
    console.log(JSON.stringify(track))
    const alreadyAdded = state.playlistTracks.find(playlistTrack => playlistTrack.id === track.id)
    if (!alreadyAdded) {
      setState({
        ...state,
        playlistTracks: state.playlistTracks.concat(track)
      })
    }
  }

  function removeTrack(track) {
    console.log(JSON.stringify(track))
    setState({
      ...state,
      playlistTracks: state.playlistTracks.filter(playlistTrack => playlistTrack.id !== track.id)})
  }

  function updatePlaylistName(name) {
    setState({
      ...state,
      playlistName: name
    })
  }

  async function savePlaylist() {
    const trackURIs= state.playlistTracks.map(track => track.uri)
    await Spotify.savePlaylist(state.playlistName, trackURIs)
  }

  async function search(searchTerm) {
    console.log(searchTerm)
    setState({
      ...state,
      searchResults: await Spotify.search(searchTerm)
    })
  }

  return (
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar 
            onSearch={search}/>
        <div className="App-playlist">
          <SearchResults 
            searchResults={state.searchResults}
            onAdd={addTrack}/>
          <Playlist 
            playlistName={state.playlistName}
            playlistTracks={state.playlistTracks} 
            onRemove={removeTrack}
            onNameChange={updatePlaylistName}
            onSave={savePlaylist}/>
        </div>
      </div>
    </div>
  )
}

export default App;
