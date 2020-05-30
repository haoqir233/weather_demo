import React from 'react';
import './index.css'
import { Menu} from 'antd';
// import { MailOutlined, CalendarOutlined } from '@ant-design/icons';
import { Link} from 'react-router-dom'


export default class NavLeft extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }

    }


    render() {

        return (
            <div>

                <div className="logo">
                    <img src="/assets/logo-ant.svg" alt="" />
                    <h1 className="h1_style">天气预报</h1>
                </div>
                <Menu theme="dark">
                    <Menu.Item key="1"  >
                        <Link to='/'>首页</Link>
                    </Menu.Item>
                    <Menu.Item key="2"  >
                        <Link to='/map'>地图</Link>
                    </Menu.Item>
                </Menu>

            </div>
        );
    }

}