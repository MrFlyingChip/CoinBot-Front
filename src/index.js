import React from 'react'
import { render } from 'react-dom'
import store from './store'
import {Provider} from 'react-redux'
import { Router, browserHistory } from 'react-router'
import { routes } from './Routes'

render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes}/>
    </Provider>,
    document.getElementById('root')
)