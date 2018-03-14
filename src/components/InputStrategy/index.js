import React, { Component } from 'react'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as AdminActions from "../../actions/AdminActions";
import './styles.css'

export class InputStrategy extends Component{
    addNewStrategy(e){
        e.preventDefault(e);
        let parts = [];
        if(this.checkboxChecked) {
            for(let i = 0; i < this.partsCount; i++){
                parts.push(document.getElementById('partClose' + i).value);
            }
        }
        const data = {
            coin : document.getElementById('coin').value,
            name: document.getElementById('name').value,
            partsNumber: document.getElementById('partsNumber').value,
            percentProfit: document.getElementById('percentProfit').value,
            percentDeviation: document.getElementById('percentDeviation').value,
            percentMinus: document.getElementById('percentMinus').value,
            limitDays: document.getElementById('limitDays').value,
            percentClose: document.getElementById('percentClose').value,
            closeParts: document.getElementById('checkbox').checked,
            parts: parts
        };
        this.props.actions.addNewStrategy(data);
    }

    partsNumberChange(e){
        e.preventDefault(e);
        this.partsCount = document.getElementById('partsNumber').value || 0;
        this.parts = [];
        if(this.checkboxChecked){
            for(let i = 0; i < this.partsCount; i++){
                this.parts.push(i);
            }
            this.forceUpdate();
        }
    }

    toggleCheckBox(e){
        e.preventDefault(e);
        this.checkboxChecked = document.getElementById('checkbox').checked;
        document.getElementById('lol').className = (this.checkboxChecked) ? '' : 'none';
    }

    createInput = (i) => (
        <input
            type='number'
            min={0}
            step='any'
            required
            id={'partClose' + i}
            placeholder={'Процент закрытия'}
            key={i}
        />
    );

    createInputs = () => (
        this.parts.map(this.createInput)
    );

    componentWillMount(){
        this.props.actions.fetchDatabases();
        this.partsCount = 0;
        this.parts = [];
        this.checkboxChecked = false;
    }
    render(){
        let coins = this.props.admin.databases || [];
        const coinsArr = coins.map(coin => {
            return (
                <option key={coin._id}>{coin.coin}</option>
            )
        });
        return(
            <div className={'input'}>
                <form onSubmit={this.addNewStrategy.bind(this)}>
                    <p>Выберите базу данных:
                        <select id={'coin'} required>
                            {coinsArr}
                        </select>
                    </p>
                    <p>Имя стратегии: <input type={'text'} required id={'name'} placeholder={'Имя стратегии'}/></p>
                    <p>Количество частей: <input type='number' onChange={this.partsNumberChange.bind(this)} min={1} required id={'partsNumber'} placeholder={'Количество частей'}/></p>
                    <p>Процент профита: <input type='number' min={0} step='any' required id={'percentProfit'} placeholder={'Процент профита'}/></p>
                    <p>Максимальный процент отклонения для входа в сделку:
                        <input type='number' min={0} step='any' required id={'percentDeviation'} placeholder={'Максимальный процент'}/></p>
                    <p>Процент минуса: <input type='number' min={0} step='any' required id={'percentMinus'} placeholder={'Процент минуса'}/></p>
                    <p>Лимит срока (в днях): <input type='number' min={1} required id={'limitDays'} placeholder={'Лимит срока'}/></p>
                    <p>Процент закрытия: <input type='number' min={0} step='any' required id={'percentClose'} placeholder={'Процент закрытия'}/></p>
                    <p><input className={'checkbox'} id={'checkbox'} type={'checkbox'} onChange={this.toggleCheckBox.bind(this)}/>Закрывать сделку частями</p>
                    <p id={'lol'} className={'none'}>{this.createInputs()}</p>
                    <button type='submit' className='input-button'>Добавить стратегию</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(InputStrategy)