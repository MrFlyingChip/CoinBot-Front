import React, { Component } from 'react'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as AdminActions from "../../actions/AdminActions";
import './styles.css'

export class InputDeal extends Component{
    addNewDeal(e){
        e.preventDefault(e);
        const data = {
            strategy : document.getElementById('strategy').value,
            budget: document.getElementById('budget').value,
        };
        this.props.actions.addNewDeal(data);
    }

    componentWillMount(){
        this.props.actions.fetchStrategies();
    }
    render(){
        let strategies = this.props.admin.strategies || [];
        const strategiesArr = strategies.map(strategy => {
            return (
                <option key={strategy._id}>{strategy.name}</option>
            )
        });
        return(
            <div className={'input'}>
                <form onSubmit={this.addNewDeal.bind(this)}>
                    <p>Выберите стратегию:
                        <select id={'strategy'} required>
                            {strategiesArr}
                        </select>
                    </p>
                    <p>Бюджет: <input type='number' min={0} step='any' required id={'budget'} placeholder={'Бюджет'}/></p>
                    <button type='submit' className='input-button'>Добавить сделку</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(InputDeal)