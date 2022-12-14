let accessToken;
const clientID = "efe462c23a0544baa683dca17e254b00";
const redirectURI = "https://madmutt-jammming.surge.sh/";//http://localhost:3000/

const Spotify = {
    getAccessToken(){
        if (accessToken) {
            return accessToken;
        } 
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
        if(accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        }
        else {
            window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`
        }
    },

    search(term){
        accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,{
            headers: {
                Authorization : `Bearer ${accessToken}`
            }
        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            if(!jsonResponse.tracks){
                return [];
            }

            return jsonResponse.tracks.items.map(track => ({
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    img: track.album.images[0].url,
                    href: track.href,
                    preview_url: track.preview_url,
                    uri: track.uri
                })
            );
        })
    },

    savePlayList(name,trackUris){

        if(!name || !trackUris.length){
            return;
        }

        const headers = {Authorization : `Bearer ${accessToken}`};
        let userId;

        return fetch('https://api.spotify.com/v1/me', { headers : headers }
            ).then(response => {
                return response.json();
            }).then(jsonResponse => {
                userId = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, 
                    {
                        headers: headers,
                        method: 'POST',
                        body: JSON.stringify({ name: name })
                    }).then(response => {
                        return response.json();
                    }).then(jsonResponse => {
                        const playlistId = jsonResponse.id;
                        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,{
                            headers: headers,
                            method: 'POST',
                            body: JSON.stringify({ uris: trackUris })
                        });
                    }
                );
        });
    }
}

export default Spotify;
