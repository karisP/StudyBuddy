
import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Player from "./components/Player";

export const authEndpoint = 'https://accounts.spotify.com/authorize';

const clientId = "";
const redirectUri = "http://localhost:3000";
const scopes = [
  "user-read-currently-playing",
  "user-read-playback-state",
];

const hash = window.location.hash
  .substring(1)
  .split("&")
  .reduce(function (initial, item) {
    if (item) {
      var parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
    }
    return initial;
  }, {});

  console.log("hash", window.location.hash);
window.location.hash = "";

function App() {
  const [token, setToken] = React.useState(null);
  const [item, setItem] = React.useState({
    album:
      { images: [{ url: "" }] },
    name: "",
    artists: [{ name: "" }],
    duration_ms: 0,
  });
  const [isPlaying, setIsPlaying] = React.useState("Paused");
  const [progress, setProgress] = React.useState(0);

  console.log("token", token);
  console.log("item", item);
  console.log("isPlaying", isPlaying);
  console.log("progress", progress);
  // React.useEffect(() => {
  //   fetch("/api")
  //     .then((res) => res.json())
  //     .then((data) => setData(data.message));
  // }, []);
  React.useEffect(() => {
    let _token = hash.access_token;
    console.log("_token", _token);
    if (_token) {
      setToken(_token);
      fetch("https://api.spotify.com/v1/me/player", {
        method: "GET",
        headers: {
          "Authorization": "Bearer" + _token
        }
      })
      .then((res) => res.json())
      .then((data) => {
        setItem(data.item)
        setIsPlaying(data.is_playing)
        setProgress(data.progress_ms)
      });
    }

  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {/* <p>{!data ? "Loading..." : data}</p> */}
        {!token && (
          <a
            className="btn btn--loginApp-link"
            href={`${authEndpoint}client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`}
          >
            Login to Spotify
          </a>)}
        {token && (
          <Player
            item={item}
            is_playing={isPlaying}
            progress_ms={progress}
          />
        )}

      </header>
    </div>
  );
}

export default App;