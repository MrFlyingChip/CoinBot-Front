import React, { Component } from 'react'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as AdminActions from "../../actions/AdminActions";
import './styles.css'
import { Link } from 'react-router';
export class StrategiesInfo extends Component{
    componentWillMount(){
        this.props.actions.fetchStrategiesInfo();
    }

    render(){
        let strategies = this.props.admin.strategies_info || [];
        let i = 0;
        const strategiesArr = strategies.map(strategy => {
            i++;
            return (
                <tr key={strategy.id}>
                    <td>{i}</td>
                    <td>{strategy.name}</td>
                    <td>{strategy.coin}</td>
                    <td>{strategy.startDate}</td>
                    <td>{strategy.finishDate}</td>
                    <td>{strategy.profitParts}/{strategy.minusParts}/{strategy.waitParts}</td>
                    <td>{strategy.percentProfit}%</td>
                    <td><p><Link to={'/strategy/' + strategy.id}>Редактировать</Link></p>
                        <p><Link to={'/strategy_delete/' + strategy.id}>Удалить</Link></p></td>
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