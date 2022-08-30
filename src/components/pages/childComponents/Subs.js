

import React from "react";
import { getSubscribers } from "../../../UserService";
import UserComp from "./UserComp";
class Subs extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            list: []
        }
    }
    componentDidMount(){
       
        getSubscribers(this.props.userId, 1, (data) => {
            this.setState({
                list: data.map(x => <UserComp user={x} variant="none"></UserComp>)
            })
        })
    }
    render(){
        if(!this.state.list.length){
            return(
                <div className="empty-list-title">You don't have subscribers yet</div>
            )
        } else{
            return(
                <div>{this.state.list}</div>
            )
        }
    }
}
export default Subs