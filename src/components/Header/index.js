import React from 'react';
import { Row,Col } from 'antd';
import "./index.css"
import Util from '../../utils/utils';

export default class Header extends React.Component{
    constructor(props){
        super(props)
        this.state={
            
        }
        setInterval(()=>{
           let sysTime = Util.formateDate(new Date().getTime());
            this.setState({
                sysTime
            })
        },1000)
    }
    render(){
        return (
            <div className="header">
                <Row className="breadcrumb">
                    <Col span="4" className="breadcrumb-title">
                        简易天气预报Demo
                    </Col>
                    <Col span="20" className="weather">
                        <span className="date">{this.state.sysTime}</span>
                        <span className="weather-detail">晴转多云</span>
                    </Col>
                </Row>
            </div>
        )
    }
}