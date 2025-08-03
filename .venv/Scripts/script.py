import requests
import json
import pyperclip
import time

API_KEY = "d8b65e4db3fc7db8f5be9fada062ef1d"
name = input("Input Last.fm username: ")
url = "https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=" + name + "&api_key=" + API_KEY + "&format=json&limit=1"

origSong = ""

while True:
    result = requests.get(url)
    data = result.json()

    currTrack = data['recenttracks']['track'][0]

    playingPrefix = "Last Played: "
    if '@attr' in currTrack:
        playingPrefix = "Now Playing: "

    songName = currTrack['name']
    artistName = currTrack['artist']['#text']
    fullText = playingPrefix + songName + " by " + artistName

    time.sleep(1)

    if origSong != songName:
        print("Writing!")
        print(fullText)
        origSong = songName
        pyperclip.copy(fullText)