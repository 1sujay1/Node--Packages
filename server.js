const express = require('express');
const app = express();
const mongoose = require('mongoose')
require('dotenv').config()
const routes = require('./src/v1/controllers/index');
const axios = require('axios');
const ejs = require('ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine','ejs');
app.use(express.static('./public'))

app.use(routes)

mongoose.connect(process.env.MONGO_DD, {
    useNewUrlParser: true, useUnifiedTopology: true
})

    .then(console.log("Connected to mongodb instance" + process.env.MONGO_DD))
    .catch(err => {
        console.error("Err0r connecting to mongodb", err)
    })


app.get('/', (req, res) => {
    return res.render("test")
})

const getYoutubePlayLists = async () => {
    let url = `https://youtube.googleapis.com/youtube/v3/playlists?part=snippet%2CcontentDetails&channelId=aabc&maxResults=25&key=abcd`
    let resp = await axios.get(url);
    console.log(resp.data);
    return resp;
}
const getYoutubePlayListVideo = async () => {
    let url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=200&playlistId=PLCzH0t8dhE3Np5mWkzKA-9CBcGUfvlyl3&key=abcd`
    let resp = await axios.get(url);
    return resp;
}
let channelId = "aabc"
let channelTitle = "title"
app.get('/youtube', async (req, res) => {
    let playListUrl = `https://youtube.googleapis.com/youtube/v3/playlists?part=snippet%2CcontentDetails&channelId=aabc&maxResults=25&key=abcd`
    let resp = await axios.get(playListUrl);
    let playListItems = resp.data.items;
    let playListVideoUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=200&playlistId=PLCzH0t8dhE3Np5mWkzKA-9CBcGUfvlyl3&key=abcd`
    resp = await axios.get(playListVideoUrl);
    let playListVideoItems = resp.data.items;

    let outputData = await playListItems.map((item) => {
        let newItem = { channelId, channelTitle, playLists: { id: item.id, title: item.snippet.title, thumbnails: item.snippet.thumbnails, contentDetails: item.contentDetails }, videos: [] }
        playListVideoItems.forEach(list => {
            newItem.videos.push({ videoId: list.snippet.resourceId.videoId, title: list.snippet.title, description: list.snippet.description, thumbnails: list.snippet.thumbnails });
        })
        return newItem;
    })


    return res.json({
        status: true, message: ['Youtube api'], data: outputData
    })
})

const uploadRoutes = require('./src/v1/routes/staticRoute');

app.use('/api/v1/',uploadRoutes);

app.listen(process.env.APP_PORT, () => {
    console.log(`Listening to port ${process.env.APP_PORT}`)
})