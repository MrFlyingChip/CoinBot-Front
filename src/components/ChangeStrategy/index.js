import React, {Component} from 'react'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as AdminActions from "../../actions/AdminActions";
import './styles.css'

export class ChangeStrategy extends Component {
    changeStrategy(e) {
        e.preventDefault(e);
        let parts = [];
        for(let i = 0; i < this.partsCount; i++){
            parts.push(document.getElementById('partClose' + i).value);
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
        let id = this.props.params.strategy;
        this.props.actions.changeStrategy(data, id);
    }

    partsNumberChange(e){
        e.preventDefault(e);
        this.partsCount = document.getElementById('partsNumber').value || 0;
        this.parts = [];
        for(let i = 0; i < this.partsCount; i++){
            this.parts.push(i);
        }
        this.forceUpdate()
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
            defaultValue={this.props.admin.strategy.parts[i] || ''}
        />
    );

    createInputs = () => (
        this.parts.map(this.createInput)
    );

    componentWillMount() {
        this.props.actions.fetchDatabases();
        let id = this.props.params.strategy;
        this.props.actions.fetchStrategy(id);
        this.partsCount = this.props.admin.strategy.partsNumber;
        this.parts = [];
        this.checkboxChecked = this.props.admin.strategy.closeParts;
    }

    render() {
        let strategy = this.props.admin.strategy || {};
        console.log(strategy);
        let coins = this.props.admin.databases || [];
        const coinsArr = coins.map(coin => {
            return (
                <option key={coin._id}>{coin.coin}</option>
            )
        });

        const input_form = (
                <form onSubmit={this.changeStrategy.bind(this)}>
                    <p>Выберите базу данных:
                        <select id={'coin'} required defaultValue={strategy.coin || ''}>
                            {coinsArr}
                        </select>
                    </p>
                    <p>Имя стратегии: <input type={'text'} required id={'name'} placeholder={'Имя стратегии'}
                                             defaultValue={strategy.name}/></p>
                    <p>Количество частей: <input type='number' min={1} required id={'partsNumber'}
                                                 placeholder={'Количество частей'}
                                                 defaultValue={strategy.partsNumber || ''}/></p>
                    <p>Процент профита: <input type='number' min={0} step='any' required id={'percentProfit'}
                                               placeholder={'Процент профита'}
                                               defaultValue={strategy.percentProfit || ''}/></p>
                    <p>Максимальный процент отклонения для входа в сделку:
                        <input type='number' min={0} step='any' required id={'percentDeviation'}
                               placeholder={'Максимальный процент'} defaultValue={strategy.percentDeviation || ''}/></p>
                    <p>Процент минуса: <input type='number' min={0} step='any' required id={'percentMinus'}
                                              placeholder={'Процент минуса'}
                                              defaultValue={strategy.percentMinus || ''}/></p>
                    <p>Лимит срока (в днях): <input type='number' min={1} required id={'limitDays'}
                                                    placeholder={'Лимит срока'}
                                                    defaultValue={strategy.limitDays || ''}/></p>
                    <p>Процент закрытия: <input type='number' min={0} step='any' required id={'percentClose'}
                                                placeholder={'Процент закрытия'}
                                                defaultValue={strategy.percentClose || ''}/></p>
                    <p><input className={'checkbox'} id={'checkbox'} type={'checkbox'} onChange={this.toggleCheckBox.bind(this)} checked={strategy.closeParts || false}/>Закрывать сделку частями</p>
                    <p id={'lol'} className={'none'}>{this.createInputs()}</p>
                    <button type='submit' className='input-button'>Изменить стратегию</button>
                </form>
            );
        return (
            <div className={'input'}>
                {input_form}
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

export default connect(mapStateToProps, mapDispatchToProps)(ChangeStrategy)