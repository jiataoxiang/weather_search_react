const express = require("express");
const { default: Axios } = require("axios");

let app = new express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.get('/test', (req, res) => {
    res.send("Hello World!");
})

// app.get('/location/:latlng', (req, res) => {
//     latlng = this.params.latlng.split(",")
//     console.log(latlng)
//     let url = `http://api.map.baidu.com/geocoder/v2/callback=renderReverse&location=${latlng[0]},${latlng[1]}&output=json&pois=1&ak=zsAmLtsAxPFnfj5qdd976miZDbGEODzz`
//     Axios.get(url).then((response) => {
//         console.log(response);
//         res.json(response.data);
//     }).catch((error) => {
//         console.log(error)
//     })
// });

app.get('/weather/:city', (req, res) => {
    console.log(req.params.city);
    let url = `http://apis.juhe.cn/simpleWeather/query?city=${req.params.city}&key=3a254b2f20e2a6f217f3405cb3c0a876`
    let encoded = encodeURI(url)
    Axios.get(encoded).then((response) => {
        console.log(response);
        res.json(response.data);
    }).catch((error) => {
        console.log(error)
    })
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));