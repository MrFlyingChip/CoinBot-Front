import React, { Component } from 'react'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as AdminActions from "../../actions/AdminActions";

export class StrategyInfo extends Component{
    componentWillMount(){
        let id = this.props.params.strategy;
        let data = {
            startDate: this.props.params.startDate,
            finishDate: this.props.params.finishDate,
        }
        this.props.actions.fetchStrategyInfo(data, id);
    }
    render(){
        let deals = this.props.admin.strategy_info || [];
        console.log(this.props.admin.strategy_info);
        let i = 0;
        const dealsArr = deals.map(deal => {
            i++;
            return (
                <tr key={deal._id} className={(deal.status === 'Завершена') ? ((deal.incomeDollars >= 0) ? 'profit' : 'nonProfit') : 'notEnded'}>
                    <td>{i}</td>
                    <td>{deal.date}</td>
                    <td>{deal.coin}</td>
                    <td>{deal.inputPrice}</td>
                    <td>{deal.budget}</td>
                    <td>{deal.currentPrice}</td>
                    <td>{deal.maxPrice}</td>
                    <td>{deal.currentIncome}</td>
                    <td>{deal.incomeBTC}</td>
                    <td>{deal.incomeDollars}</td>
                    <td>{deal.days}</td>
                    <td>{deal.status}</td>
                </tr>
            )
        });
        return(
            <div className={'input'}>
                <table>
                    <thead>
                    <tr>
                        <td>№</td>
                        <td>Дата</td>
                        <td>Монета</td>
                        <td>Цена входа</td>
                        <td>Депозит сделки</td>
                        <td>Текущая цена</td>
                        <td>Максимальная цена</td>
                        <td>Текущий профит</td>
                        <td>Прибыль в BTC</td>
                        <td>Прибыль в $</td>
                        <td>Дней в сделке</td>
                        <td>Статус сделки</td>
                    </tr>
                    </thead>
                    <tbody>
                    {dealsArr}
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

export default connect(mapStateToProps, mapDispatchToProps)(StrategyInfo)