import React, {Component} from 'react';
import Axios from 'axios';

//计算字符串长度
String.prototype.strLen = function() {
    var len = 0;
    for (var i = 0; i < this.length; i++) {
        if (this.charCodeAt(i) > 255 || this.charCodeAt(i) < 0) len += 2; else len ++;
    }
    return len;
}
//将字符串拆成字符，并存到数组中
String.prototype.strToChars = function(){
   var chars = new Array();
   for (var i = 0; i < this.length; i++){
       chars[i] = [this.substr(i, 1), this.isCHS(i)];
   }
   String.prototype.charsArray = chars;
   return chars;
}
//判断某个字符是否是汉字
String.prototype.isCHS = function(i){
   if (this.charCodeAt(i) > 255 || this.charCodeAt(i) < 0) 
       return true;
   else
       return false;
}
//截取字符串（从start字节到end字节）
String.prototype.subCHString = function(start, end){
   var len = 0;
   var str = "";
   this.strToChars();
   for (var i = 0; i < this.length; i++) {
       if(this.charsArray[i][1])
           len += 2;
       else
           len++;
       if (end < len)
           return str;
       else if (start < len)
           str += this.charsArray[i][0];
   }
   return str;
}
//截取字符串（从start字节截取length个字节）
String.prototype.subCHStr = function(start, length){
   return this.subCHString(start, start + length);
}

export default class WeatherSearch extends Component {
    MP(ak) {
        return new Promise(function(resolve, reject) {
            var script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `http://api.map.baidu.com/api?v=2.0&ak=${ak}&callback=init`;
            document.head.appendChild(script)
            window.init = () => {
                resolve(window.BMap)
            }
        })
    }

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
        this.MP("PAZGg1jfimrTHCIAsoQc9zfsRbh").then(BMap=>{
            var map = new BMap.Map('allmap');            // 创建Map实例
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position)=>{
                let latitude = position.coords.latitude
                let longitude = position.coords.longitude
                var point = new BMap.Point(latitude, longitude); // 创建点坐标
                var gc = new BMap.Geocoder();
                gc.getLocation(point, (rs) => {
                    var addComp = rs.addressComponents;
                    let city = addComp.city.subCHStr(0, addComp.city.strLen() - 2)
                    let url = `weather/${city}`
                    Axios.get(url).then((response)=>{
                        console.log(response)
                        let w = response.data.result.realtime;
                        this.setState({
                            city: city,
                            weather: w.info,
                            tmp: w.temperature,
                            direct: w.direct,
                            humidity: w.humidity,
                        })
                    }).catch((err) => {
                        alert("这个城市不存在,请重新输入")
                    })
                })
            })
            } else {
                alert("你的浏览器不支持Geolocation！")
            }
        });
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
