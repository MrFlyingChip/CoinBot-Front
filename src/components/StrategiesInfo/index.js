import React, { Component } from 'react'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as AdminActions from "../../actions/AdminActions";
import './styles.css'
import { Link } from 'react-router';
export class StrategiesInfo extends Component{
    componentWillMount(){
        this.startDate = [];
        this.finishDate = [];
        const data = {
            startDate: this.startDate,
            finishDate: this.finishDate
        };
        this.props.actions.fetchStrategiesInfo(data);
    }

    onStartDateChange(e){
        e.preventDefault(e);
        this.startDate = [];
        for(let i = 0; i < this.props.admin.strategies_info.length; i++){
            this.startDate.push(new Date(document.getElementById('startDate' + this.props.admin.strategies_info[i].id).value));
        }
        const data = {
            startDate: this.startDate,
            finishDate: this.finishDate
        };
        this.props.actions.fetchStrategiesInfo(data);
    }

    onFinishDateChange(e){
        e.preventDefault(e);
        this.finishDate = [];
        for(let i = 0; i < this.props.admin.strategies_info.length; i++){
            this.finishDate.push(new Date(document.getElementById('finishDate' + this.props.admin.strategies_info[i].id).value));
        }
        const data = {
            startDate: this.startDate,
            finishDate: this.finishDate
        };
        this.props.actions.fetchStrategiesInfo(data);
    }

    render(){
        let strategies = this.props.admin.strategies_info || [];
        let i = -1;
        const strategiesArr = strategies.map(strategy => {
            i++;
            let dateStart = (this.startDate[i]) ?  this.startDate[i].toDateString() : new Date(2017, 1, 1).toDateString();
            let dateFinish = (this.finishDate[i]) ? this.finishDate[i].toDateString(): new Date().toDateString();
            console.log(dateStart);
            return (
                <tr key={strategy.id}>
                    <td>{i+1}</td>
                    <td>{strategy.name}</td>
                    <td>{strategy.coin}</td>
                    <td><input type={'date'} onChange={this.onStartDateChange.bind(this)} id={'startDate' + strategy.id} defaultValue={new Date(2017, 1, 1).toISOString().substr(0, 10)}/></td>
                    <td><input type={'date'} onChange={this.onFinishDateChange.bind(this)} id={'finishDate' + strategy.id} defaultValue={new Date().toISOString().substr(0, 10)}/></td>
                    <td>{strategy.profitParts}/{strategy.minusParts}/{strategy.waitParts}</td>
                    <td>{strategy.percentProfit}%</td>
                    <td>
                        <p><Link to={'/strategy_info/' + strategy.id + '/' + dateStart + '/' + dateFinish}>Детализация</Link></p>
                        <p><Link to={'/strategy/' + strategy.id}>Редактировать</Link></p>
                        <p><Link to={'/strategy_delete/' + strategy.id}>Удалить</Link></p>
                    </td>
                </tr>
            )
        });
        return(
            <div className={'input'}>
                <table>
                    <thead>
                    <tr>
                        <td>№</td>
                        <td>Название стратегии</td>
                        <td>База данных</td>
                        <td>Дата начала</td>
                        <td>Дата окончания</td>
                        <td>Прибыльные/Убыточные/В ожидании</td>
                        <td>Прибыль</td>
                        <td>Действия</td>
                    </tr>
                    </thead>
                    <tbody>
                    {strategiesArr}
                    </tbody>
                </table>
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

export default connect(mapStateToProps, mapDispatchToProps)(StrategiesInfo)