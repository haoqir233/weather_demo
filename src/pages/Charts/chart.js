import { Card, Cascader, Button } from 'antd';
import React, { Component } from 'react';
import axios from 'axios';
import './index.css';
import {
    Chart,
    Geom,
    Axis,
    Tooltip,
    Legend,
} from 'bizcharts';
import PJson from '../../JSON/province.json';
import CJson from '../../JSON/city.json';

//用作折线图的天气数据缓存
const temp = [];

export default class Cas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //用于保存遍历的省和市
            treedata: [],
            //用于向后端发送省市
            cityClick: [],
            //用于保存后端推送的天气数据
            weather: [],
        }
    }

    onChange = (value) => {
        this.setState({
            cityClick: value
        })
        // console.log(this.state.treedata);
    }

    // 城市遍历
    mapProvince = (pdata,cdata) => {
        //用来存储所有的数据
        let map = [];
        //存放所有省的名字
        let provinceArr = [];
        //存放所有省的id
        let provinceId = [];
        pdata.map((item) => {
                provinceArr.push(item.province_name)
                provinceId.push(item.id)
                return;
        })

        for (var i = 0; i < provinceArr.length; i++) {
            let citys = [{}]
            cdata.map((item) => {
                if (item.provinceid === provinceId[i]) {
                    // console.log(item.cityname);
                    citys = citys.concat([{
                        value: item.city_name,
                        label: item.city_name,
                    }])
                }
                return true;
            })
            //每个省的数组
            let newmap = {
                value: provinceArr[i],
                label: provinceArr[i],
                children: citys
            }
            map = map.concat(newmap)
        }
        return map;
    }

    componentWillMount() {
        this.setState({
            treedata: this.mapProvince(PJson.RECORDS,CJson.RECORDS)
        });
    }

    // 查询
    getWeatherAPIData = () => {
        let url = 'http://39.106.12.235:8096/rest/weather/getWeatherInfo';
        let param = {
            "cmd": "getWeatherInfo",
            "type": "request",
            "request": {
                "provinceName": this.state.cityClick[0],
                "cityName": this.state.cityClick[1],
            }
        }
        axios.post(url, param).then((res) => {
            let data1 = res.data;
            // console.log(data1);
            let data2 = data1.response.data;

            //判断缓存是否存在
            if (temp.length !== 0) {
                //清空缓存数组
                temp.length = 0
            }
            if (data2.res) {
                data2.message.map((item) => {
                    temp.push({
                        month: item.date,
                        limit: '最高温度',
                        temperature: Number(item.maxTemperature),
                    })
                    temp.push({
                        month: item.date,
                        limit: '最低温度',
                        temperature: Number(item.minTemperature),
                    })
                    temp.push({
                        month: item.date,
                        limit: '风向',
                        temperature: item.windDirection,
                    })
                    temp.push({
                        month: item.date,
                        limit: '风速',
                        temperature: item.windSpeed,
                    })
                    temp.push({
                        month: item.date,
                        limit: '天气',
                        temperature: item.type,
                    })
                    return true;
                })
                this.setState({
                    weather: data1.response.data.message,
                });
                // console.log("数据:", this.state.weather);

            }
        }).catch((err) => {
            console.error(err);
        })
    }

    render() {
        //天气纵轴数据
        const cols = {
            month: {
                range: [0, 1],
                alias: '日期'
            },
            temperature: {
                alias: '七天温度变化情况',
                max: 40,
                min: -20
            }
        };

        return (
            <div>
                <Cascader options={this.state.treedata} onChange={this.onChange} placeholder="请选择城市" />
                <Button type="primary" onClick={this.getWeatherAPIData}>查询</Button>
                <br />
                <Card className='card-wrap' title='温度折线图'>
                    <Chart height={400} padding='auto' data={temp} scale={cols} forceFit placeholder>
                        <Legend />
                        <Axis name="month" />
                        <Axis
                            name="temperature"
                            label={{
                                formatter: val => `${val}°C`
                            }}
                        />
                        <Tooltip
                            crosshairs={{
                                type: 'y',
                            }}
                            custom={true}
                        />
                        <Geom
                            type="line"
                            position="month*temperature"
                            size={2}
                            color={"limit"}
                            shape={"smooth"}
                        />
                        <Geom
                            type="point"
                            position="month*temperature"
                            size={4}
                            shape={"circle"}
                            color={"limit"}
                            style={{
                                stroke: "#4B0082",
                                lineWidth: 1
                            }}
                        />
                    </Chart>

                </Card>

            </div>
        )

    }
}