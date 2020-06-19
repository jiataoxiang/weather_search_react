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

app.get('/autoweather/:city', (req, res) => {
    let city = req.params.city;
    console.log(city)
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=[your key]`
    Axios.get(url).then((response) => {
        console.log(response);
        res.json(response.data);
    }).catch((error) => {
        console.log(error)
    })
})

app.get('/location/:latlng', (req, res) => {
    latlng = req.params.latlng.split(",")
    console.log(latlng)
    let url = `https://api.opencagedata.com/geocode/v1/json?q=${latlng[0]}+${latlng[1]}&key=[your key]`
    Axios.get(url).then((response) => {
        console.log(response);
        res.json(response.data);
    }).catch((error) => {
        console.log(error)
    })
});

app.get('/weather/:city', (req, res) => {
    console.log(req.params.city);
    let url = `http://apis.juhe.cn/simpleWeather/query?city=${req.params.city}&key=[your key]`
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