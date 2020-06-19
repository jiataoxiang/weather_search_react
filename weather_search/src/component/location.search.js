import React, {Component} from 'react';
import Axios from 'axios';


export default class WeatherSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            latitude: "",
            longitude: "",
            city: "",
            date: (new Date()).toLocaleString(),
            weather: "",
            tmp: "",
            direct: "",
            humidity: "",
        }
    }
    
    componentDidMount() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position)=>{
                let latitude = position.coords.latitude
                let longitude = position.coords.longitude
                let url = `location/${latitude},${longitude}`
                Axios.get(url).then((response) => {
                    let city = response.data.results[0].components.city
                    let inner_url = `autoweather/${city}`
                    Axios.get(inner_url).then((res) => {
                        let w = res.data;
                        this.setState({
                            city: city,
                            weather: w.weather[0].main,
                            tmp: (parseFloat(w.main.temp) - 273.15).toFixed(0),
                            direct: w.wind.deg,
                            humidity: w.main.humidity,
                        })
                    })

                })
            });
        }  
    }

    render(){
        return(
            <div className="LocationSearch">
                <div className="ctn">
                    {this.state.city ? (
                        <div id="current">
                            <h1>{this.state.city}</h1>
                            <p>{this.state.date},</p>
                            <p>温度: {this.state.tmp} ℃ | {this.state.weather}, 湿度：{this.state.humidity} %, 风向： {this.state.direct}</p>
                        </div>
                    ) : null}
                    <div id="future"></div>
                </div>
            </div>
        )
    }
}
