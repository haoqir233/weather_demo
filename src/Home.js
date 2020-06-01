import React from 'react'
import { Row, Col } from 'antd';
import 'antd/dist/antd.css';
import './index.css';
import Header from './components/Header';
import NavLeft from './components/NavLeft';


export default class Home extends React.Component {
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