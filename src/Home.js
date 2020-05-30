import React from 'react'
import { Row, Col } from 'antd';
import 'antd/dist/antd.css';
import './index.css';
//sss
import Header from './components/Header';
import NavLeft from './components/NavLeft';
import Socket from './components/Socket/websocket';


export default class Home extends React.Component {
//     constructor() {
//         super();
//         this.taskRemindInterval = null;
//     }
//     componentDidMount = () => {
//         //    判断专家是否登录
//         this.socket = new Socket({
//             socketUrl: 'ws://39.106.12.235:8096/rest/weather/getWeatherInfo',
//             timeout: 5000,
//             socketMessage: (receive) => {
//                 console.log(receive);  //后端返回的数据，渲染页面
//             },
//             socketClose: (msg) => {
//                 console.log(msg);
//             },
//             socketError: () => {
//                 console.log(this.state.taskStage + '连接建立失败');
//             },
//             socketOpen: () => {
//                 console.log('连接建立成功');
//                 // 心跳机制 定时向后端发数据
//                 this.taskRemindInterval = setInterval(() => {
//                     this.socket.sendMessage({ "msgType": 0 })
//                 }, 30000)
//             }
//         });
// 　　　　　//重试创建socket连接
//         try {
//             this.socket.connection();
//         } catch (e) {
//             // 捕获异常，防止js error
//             // donothing
//         }
//     }



    render() {
        return (
            <div>
                <Row className="container">
                    <Col span='4' className="nav-left">
                        <NavLeft />
                    </Col>
                    <Col span='20' className="main">
                        <Header />
                        <div className="content">
                            {this.props.children}
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}