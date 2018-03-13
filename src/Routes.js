import React from 'react'

import App from './containers/App'
import NotFound from './components/NotFound'
import InputStrategy from './components/InputStrategy'
import {Route, IndexRoute} from 'react-router'
import Databases from './components/Databases';
import InputDeal from "./components/InputDeal";
import Deals from "./components/Deals";
import StrategiesInfo from "./components/StrategiesInfo";
import ChangeStrategy from "./components/ChangeStrategy";
import DeleteStrategy from "./components/DeleteStrategy";


export const routes =(
    <div>
        <Route path='/' component={App}>
            <Route path='/databases' component={Databases}/>
            <Route path='/strategy_info' component={StrategiesInfo}/>
            <Route path='/input_strategy' component={InputStrategy}/>
            <Route path='/deals' component={Deals}/>
            <Route path='/input_deal' component={InputDeal}/>
            <Route path='/strategy/:strategy' component={ChangeStrategy}/>
            <Route path='/strategy_delete/:strategy' component={DeleteStrategy}/>
        </Route>
        <Route path='*' component={NotFound} />
    </div>
)