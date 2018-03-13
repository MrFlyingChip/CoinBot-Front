import {
    FETCH_DATABASES,
    ADD_DATABASE,
    ADD_STRATEGY,
    FETCH_STRATEGIES,
    FETCH_STRATEGY,
    CHANGE_STRATEGY,
    ADD_DEAL,
    FETCH_DEALS,
    FETCH_STRATEGIES_INFO,
    DELETE_STRATEGY
} from "../constants/Admin";
import {browserHistory} from "react-router";
import {API_URL} from "../constants/Library";

export function addNewDatabase(payload) {
    return (dispatch) => {
        let xhr1 = new XMLHttpRequest();
        let url = API_URL + '/coins';
        let formData = new FormData();
        formData.append('coin', payload.coin);
        xhr1.open('POST', url, false);
        xhr1.send(formData);

        let sRes = JSON.parse(xhr1.response);
        alert(sRes.message);
        browserHistory.push('/');
        dispatch({
            type: ADD_DATABASE,
            payload: {}
        })
    }
}

export function fetchDatabases() {
    return (dispatch) => {
        let xhr1 = new XMLHttpRequest();
        const url = API_URL + '/coins';
        xhr1.open("GET", url, false);
        xhr1.send();
        let res = JSON.parse(xhr1.response);
        if(res.error){
            alert(res.error.name + ': ' +res.error.message);
            dispatch({
                type: FETCH_DATABASES,
                payload: {
                    databases: []
                }
            })
        }
        else{
            dispatch({
                type: FETCH_DATABASES,
                payload: {
                    databases: res
                }
            })
        }

    }
}

export function fetchDeals() {
    return (dispatch) => {
        let xhr1 = new XMLHttpRequest();
        const url = API_URL + '/parts';
        xhr1.open("GET", url, false);
        xhr1.send();
        let res = JSON.parse(xhr1.response);
        dispatch({
            type: FETCH_DEALS,
            payload: {
                deals: res
            }
        })
    }
}

export function fetchStrategies() {
    return (dispatch) => {
        let xhr1 = new XMLHttpRequest();
        const url = API_URL + '/strategies';
        xhr1.open("GET", url, false);
        xhr1.send();
        let res = JSON.parse(xhr1.response);
        if(res.error){
            alert(res.error)
        }
        dispatch({
            type: FETCH_STRATEGIES,
            payload: {
                strategies: res
            }
        })
    }
}

export function fetchStrategy(id) {
    return (dispatch) => {
        let xhr1 = new XMLHttpRequest();
        const url = API_URL + '/strategy/' + id;
        xhr1.open("GET", url, false);
        xhr1.send();
        console.log(xhr1.response);
        let res = JSON.parse(xhr1.response);
        if(res.error){
            alert(res.error)
        }
        dispatch({
            type: FETCH_STRATEGY,
            payload: {
                strategy: res
            }
        })
    }
}

export function deleteStrategy(id) {
    return (dispatch) => {
        let xhr1 = new XMLHttpRequest();
        const url = API_URL + '/strategy/' + id;
        xhr1.open("DELETE", url, false);
        xhr1.send();
        console.log(xhr1.response);
        let res = JSON.parse(xhr1.response);
        if(res.error){
            alert(res.error)
        } else {
            alert(res.message)

        }
        browserHistory.push('/strategy_info');
        dispatch({
            type: DELETE_STRATEGY,
            payload: {
            }
        })
    }
}

export function fetchStrategiesInfo() {
    return (dispatch) => {
        let xhr1 = new XMLHttpRequest();
        const url = API_URL + '/strategies_info';
        xhr1.open("GET", url, false);
        xhr1.send();
        let res = JSON.parse(xhr1.response);
        if(res.error){
            alert(res.error)
        }
        dispatch({
            type: FETCH_STRATEGIES_INFO,
            payload: {
                strategies_info: res
            }
        })
    }
}

/*export function addNewStrategy(payload) {
    return (dispatch) => {
        let xhr1 = new XMLHttpRequest();
        let url = API_URL + '/strategy';
        xhr1.open('POST', url, false);
        xhr1.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        var body = 'coin=' + encodeURIComponent(payload.coin) +
            '&name=' + encodeURIComponent(payload.name)+
            '&partsNumber=' + encodeURIComponent(payload.partsNumber)+
            '&percentProfit=' + encodeURIComponent(payload.percentProfit)+
            '&percentDeviation=' + encodeURIComponent(payload.percentDeviation)+
            '&percentMinus=' + encodeURIComponent(payload.percentMinus)+
            '&limitDays=' + encodeURIComponent(payload.limitDays)+
            '&percentClose=' + encodeURIComponent(payload.percentClose);
        console.log(body);
        xhr1.send(body);
        let sRes = JSON.parse(xhr1.response);
        alert(sRes.message);
        browserHistory.push('/');
        dispatch({
            type: ADD_STRATEGY,
            payload: {}
        })
    }
}*/

export function addNewStrategy(payload) {
    return (dispatch) => {
        let xhr1 = new XMLHttpRequest();
        let url = API_URL + '/strategy';
        xhr1.open('POST', url, false);
        xhr1.setRequestHeader('Content-Type', 'application/json');
        var body = JSON.stringify(payload);
        xhr1.send(body);
        let sRes = JSON.parse(xhr1.response);
        alert(sRes.message);
        browserHistory.push('/');
        dispatch({
            type: ADD_STRATEGY,
            payload: {}
        })
    }
}

export function changeStrategy(payload, id) {
    return (dispatch) => {
        let xhr1 = new XMLHttpRequest();
        let url = API_URL + '/strategy/' + id;
        xhr1.open('PUT', url, false);
        xhr1.setRequestHeader('Content-Type', 'application/json');
        var body = JSON.stringify(payload);
        xhr1.send(body);
        let sRes = JSON.parse(xhr1.response);
        alert(sRes.message);
        browserHistory.push('/');
        dispatch({
            type: CHANGE_STRATEGY,
            payload: {}
        })
    }
}

export function addNewDeal(payload) {
    return (dispatch) => {
        let xhr1 = new XMLHttpRequest();
        let url = API_URL + '/deal';
        xhr1.open('POST', url, false);
        xhr1.setRequestHeader('Content-Type', 'application/json');
        var body = JSON.stringify(payload);
        xhr1.send(body);
        let sRes = JSON.parse(xhr1.response);
        alert(sRes.message);
        browserHistory.push('/');
        dispatch({
            type: ADD_DEAL,
            payload: {}
        })
    }
}
