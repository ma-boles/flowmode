const { v4: uuidv4 } = require('uuid');

const mock_client_id = uuidv4();
const mock_client_secret = uuidv4();

const mockSpotifyProvider = jest.fn(() => ({
    id: 'spotify',
    name: 'Spotify',
    type: 'oauth',
    version: '2.0',
    scope: 'user-read-email user-read-private playlist-read-private playlist-modify-private playlist-modify-public user-read-playback-state user-modify-playback-state user-read-currently-playing user-read-recently-played streaming',
    clientId: mock_client_id,
    clientSecret: mock_client_secret,
    accessTokenUrl: 'https://accounts.spotify.com/api/token',
    authorizationUrl: 'https://accounts.spotify.com/authorize',
    profileUrl: 'https://api.spotify.com/v1/me',
    profile: (profile) => ({
        id: profile.id,
        name: profile.display_name,
        email: profile.email,
    }),
}));

module.exports = mockSpotifyProvider;