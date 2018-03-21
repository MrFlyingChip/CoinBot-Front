import React, { Component } from 'react'
import './styles.css'
import { Link } from 'react-router';
import {bindActionCreators} from "redux";
import * as AdminActions from "../../actions/AdminActions";
import {connect} from "react-redux";

export class App extends Component{
    componentWillMount() {

    }
    render() {
        return(
            <div className='container'>
                <h1>Admin panel</h1>
                <Link to={'/databases'}>Базы данных</Link>
                <Link to={'/strategy_info'}>Стратегии</Link>
                <Link to={'/input_strategy'}>Добавить стратегию</Link>
                <Link to={'/input_deal'}>Добавить сделку</Link>
                {this.props.children}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        admin: state.admin
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(AdminActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
