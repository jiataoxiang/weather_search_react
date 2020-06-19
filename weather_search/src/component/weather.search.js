import React, {Component} from 'react';
import axios from 'axios';

export default class WeatherSearch extends Component {
    constructor(props) {
        super(props);

        this.onChangeCity = this.onChangeCity.bind(this);
        this.onSearch = this.onSearch.bind(this);

        this.state = {
            city: "南京",
            cityName: "",
            date: (new Date()).toLocaleString(),
            weather: "",
            tmp: "",
            direct: "",
            humidity: "",
            flag: false
        }
    }

    onChangeCity(e) {
        this.setState({
            city: e.target.value
        });
    }

    onSearch(e) {
        e.preventDefault();
        let cityName = this.state.city
        let url = `weather/${cityName}`
        axios.get(url).then((response)=>{
            console.log(response)
            let w = response.data.result.realtime;
            this.setState({
                cityName: this.state.city,
                weather: w.info,
                tmp: w.temperature,
                direct: w.direct,
                humidity: w.humidity,
                flag:true
            })
        }).catch((err) => {
            alert("这个城市不存在,请重新输入")
        })
    }

    componentDidMount() {
        // right before anything load.
    }

    render() {
        return (
            <div className="WeatherSearch">
                <button onClick={this.onSearch} id="search">天气查询</button>
                <input onChange={this.onChangeCity} 
                    id="city" 
                    type="text" 
                    value={this.state.city}>    
                </input>
                <div className="ctn">
                    {this.state.flag ? (
                        <div id="current">
                            <h1>{this.state.cityName}</h1>
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