import React from 'react';
import {HashRouter,Route,Switch} from 'react-router-dom';
import Home from './Home';
import Charts from './pages/Charts/chart';
import Maps from './pages/Map/map';


export default class Router extends React.Component{

    render(){
        return(
            <HashRouter>
                <Home>
                    <Switch>
                        <Route exact path="/" component={Charts}/>
                        <Route path="/map" component={Maps}/>
                    </Switch>
                </Home>    
            </HashRouter>
        )
    }
}