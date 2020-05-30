import React from 'react';
import { Card ,Cascader, Button} from 'antd';
import { Map,Marker } from 'react-amap';
import axios from 'axios';
import PJson from '../../JSON/province.json';
import CJson from '../../JSON/city.json';

export default class Maps extends React.Component {
    constructor() {
        super();
        this.state = {
            plugins: ['Scale','ControlBar'],
            markerPosition:{ longitude: 112.239741, latitude: 30.335165 },
            mapCenter:{ longitude: 112.239741, latitude: 30.335165 },
            //用于保存遍历的省和市
            treedata: [],
            //用于向后端发送省市
            cityClick: [],
        }
    }

    //地图工具栏
    toggleCtrlBar = () => {
        if (this.state.plugins.indexOf('ControlBar') === -1) {
            this.setState({
                plugins: ['Scale','ControlBar']
            });
        } else {
            this.setState({
                plugins: []
            });
        }
    }

    //下拉框点击事件
    onChange = (value) => {
        this.setState({
            cityClick: value
        })
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
                return true;
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
        let path = 'https://restapi.amap.com/v3/geocode/geo?key=9be6d03c3030c51cc9d9d38cc4b6ea70&address=';
        let url = path + this.state.cityClick[0]+this.state.cityClick[1];
        axios.get(url).then((res) => {
            let data = res.data.geocodes;
            //缓存取到的经纬度
            let loc = [];
            data.map((item) => {
                //split方法通过特定字符截取字符串
                loc = item.location.split(",");
                return true;
            })
            //用于保存特定对象
            let temp={
                longitude:loc[0],
                latitude:loc[1]
            }
            this.setState({
                markerPosition:temp,
                mapCenter:temp
            })
        }
        ).catch((err) => {
            console.error(err);
        })
    }

    render() {
        return (
            <div>
                <Cascader options={this.state.treedata} onChange={this.onChange} placeholder="请选择城市" />
                <Button type="primary" onClick={this.getWeatherAPIData}>查询</Button>
                <br />
                <Card className='card-wrap' title='查询城市位置'>
                    <div style={{ width: '100%', height: '500px' }}>
                        <Map amapkey={'9be6d03c3030c51cc9d9d38cc4b6ea70'}
                            viewMode="3D"
                            plugins={this.state.plugins}
                            center={this.state.mapCenter}
                        >
                            <Marker position={this.state.markerPosition} />
                        </Map>
                    </div>
                    <button onClick={this.toggleCtrlBar}>Toggle Control Bar</button>
                </Card>
            </div>
        )
    }

}