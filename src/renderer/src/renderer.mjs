import got from "got";
import clipboard from "clipboardy";

async function getUserData(user, key) {
  const url =
      "https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=" +
      user +
      "&api_key=" +
      key +
      "&format=json&limit=1";
  const result = await got(url);
  return result.body;
}

function sayHello() {
  console.log("Hello!")
}

async function copyUserSong() {
  while (true) {
      
      var origSong = "";
      const apiKey = "d8b65e4db3fc7db8f5be9fada062ef1d";
      let username = document.getElementById("name").data;

      let result = await getUserData(username, apiKey);
      let data = JSON.parse(result);

      let playingPrefix = "Last played: ";
      if (Object.hasOwn(data.recenttracks.track[0], "@attr")) {
          playingPrefix = "Now playing: ";
      }

      let currSong = data.recenttracks.track[0].name;
      let currArtist = data.recenttracks.track[0].artist["#text"];

      let fullText = playingPrefix + currSong + " by " + currArtist;
      console.log(fullText);

      if (origSong != currSong) {
          origSong = currSong;
          console.log("Writing!");
          clipboard.writeSync(fullText);
      }

  }

}
