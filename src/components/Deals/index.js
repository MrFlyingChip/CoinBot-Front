import React, { Component } from 'react'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as AdminActions from "../../actions/AdminActions";
import './styles.css'

export class Deals extends Component{
    componentWillMount(){
        this.props.actions.fetchDeals();
    }
    render(){
        let deals = this.props.admin.deals || [];
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

export default connect(mapStateToProps, mapDispatchToProps)(Deals)