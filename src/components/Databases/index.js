import React, { Component } from 'react'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as AdminActions from "../../actions/AdminActions";
import './styles.css'
import {Link} from "react-router";

export class Databases extends Component{
    componentWillMount(){
        this.props.actions.fetchDatabases();
    }

    addNewDatabase(e){
        e.preventDefault();
        const coin = document.getElementById('file').files[0];
        const data = {coin: coin};
        this.props.actions.addNewDatabase(data);
    }
    render(){
        let coins = this.props.admin.databases || [];
        const coinsArr = coins.map(coin => {
            return (
                <tr key={coin._id}>
                    <td>{coin.coin}</td>
                    <td>{coin.date}</td>
                    <td><p><Link to={'/database_delete/' + coin._id}>Удалить</Link></p></td>
                </tr>
            )
        });
        return(
            <div className={'input'}>
                <table>
                    <thead>
                        <tr>
                            <td>Название базы данных</td>
                            <td>Дата загрузки</td>
                            <td>Действия</td>
                        </tr>
                    </thead>
                    <tbody>
                        {coinsArr}
                    </tbody>
                </table>
                <form onSubmit={this.addNewDatabase.bind(this)}>
                    <p>Добавить базу данных: <input type={'file'} required id={'file'} placeholder={'База данных'}/></p>
                    <button type='submit' className='input-button'>Добавить</button>
                </form>
            </div>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(Databases)