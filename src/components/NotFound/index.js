import React, { Component } from 'react'
import { Link } from 'react-router'

import './styles.css'

export default class NotFound extends Component{
    render(){
        return(
            <div className='not-found'>
                <p><b>404</b> - Page not found!</p>
                <Link to='/'>To main.</Link>
            </div>
        )
    }
}