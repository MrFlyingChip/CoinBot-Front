import React, { Component } from 'react'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as AdminActions from "../../actions/AdminActions";

export class DeleteDatabase extends Component{

    componentWillMount(){
        let id = this.props.params.coin;
        this.props.actions.deleteDatabase(id);
    }
    render(){
        return(
            <div></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DeleteDatabase)