//  create constant variables for your application’s client ID and redirect URI.
const clientId = "d8507cb273424f13ac6296c076275ae7"
const redirectUri = "http://verseisbetter.surge.sh"

let accessToken = ''

let Spotify = {
    getAccessToken() {
        if (accessToken) {
            return accessToken
        }

        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/)
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/)

        if (accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1]
            const expiresIn = Number(expiresInMatch[1])
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken
        } else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`
            window.location = accessUrl
        }
    },

    async search(term) {
        console.log("Searching...")
        const accessToken = Spotify.getAccessToken()
        console.log(accessToken)
        const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: { Authorization: `Bearer ${accessToken}` }
        })
        console.log(response)
        const jsonResponse = await response.json()
        if (!jsonResponse.tracks) {
            return []
        }
        console.log(jsonResponse)
        console.log(jsonResponse.tracks.items)
        return jsonResponse.tracks.items.map(track => ({
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri
        }))
    },

    async savePlaylist(name, trackUris) {
        if (!name || !trackUris.length) {
            return
        }

        const accessToken = Spotify.getAccessToken()
        const headers = { Authorization: `Bearer ${accessToken}` }
        let userId

        const response = await fetch('https://api.spotify.com/v1/me', { headers: headers })
        const jsonResponse = await response.json()
        userId = jsonResponse.id

        const response2 = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
            headers: headers,
            method: 'POST',
            body: JSON.stringify({ name: name })
        })
        const jsonResponse2 = await response2.json()
        const playlistID = jsonResponse2.id

        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistID}/tracks`, {
            headers: headers,
            method: 'POST',
            body: JSON.stringify({ uris: trackUris })
        })
    }
}

export default Spotify