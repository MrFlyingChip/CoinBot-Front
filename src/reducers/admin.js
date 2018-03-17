
import {FETCH_DATABASES,
        ADD_DATABASE,
        ADD_STRATEGY,
        ADD_DEAL,
        FETCH_STRATEGIES,
        FETCH_DEALS,
        DELETE_DATABASE,
        FETCH_STRATEGIES_INFO,
        FETCH_STRATEGY_INFO,
        FETCH_STRATEGY,
        CHANGE_STRATEGY,
        DELETE_STRATEGY} from '../constants/Admin'

const initialState = {
    databases : [],
    strategy : {},
    strategies : [],
    strategies_info : [],
    strategy_info: [],
    deals: [],
    id: null
};
export default function adminstate(state = initialState, action) {
    switch (action.type) {
        case FETCH_DATABASES:
            return {
                ...state,
                databases: action.payload.databases
            };
        case FETCH_STRATEGY:
            return {
                ...state,
                strategy: action.payload.strategy
            };
        case FETCH_STRATEGIES:
            return {
                ...state,
                strategies: action.payload.strategies
            };
        case FETCH_STRATEGIES_INFO:
            return {
                ...state,
                strategies_info: action.payload.strategies_info
            };
        case FETCH_STRATEGY_INFO:
            return {
                ...state,
                strategy_info: action.payload.strategy_info
            };
        case FETCH_DEALS:
            return {
                ...state,
                deals: action.payload.deals
            };
        case ADD_DATABASE:
            return {
                ...state
            };
        case ADD_STRATEGY:
            return {
                ...state
            };
        case CHANGE_STRATEGY:
            return {
                ...state
            };
        case ADD_DEAL:
            return {
                ...state
            };
        case DELETE_STRATEGY:
            return {
                ...state
            };
        case DELETE_DATABASE:
            return {
                ...state
            };
        default:
            return state
    }
}