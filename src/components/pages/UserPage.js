
import React, { useState } from "react";
import PropfileInfo from "./childComponents/ProfileInfo";
import { getUser } from "../../UserService";
import ArticleList from "./childComponents/ArticleList";
import Publishers from "./childComponents/Publishers";
import Subs from "./childComponents/Subs";
import SearchPage from "./childComponents/SearchPage";
import CreateArticleComp from "./childComponents/CreateArticleComp";

class UserPage extends React.Component {
    constructor(props) {
        super(props)
        
        this.id = this.props.match.params.id
        if(this.id == localStorage.getItem('id')){
            this.variant = 'mine'
            this.visibility = 'block'
        } else{
            this.variant = 'none'
            this.visibility = 'none'
        }
        
        this.state = {
            user: {
                name: '',
                avaBase: '',
            },
            comp: <ArticleList redir={(elem) => this.changeComp(elem)} variant={this.variant} userId={this.id}/>
        }
    }
    
    componentDidMount() {
        
        getUser(this.id, (data) => {
            this.setState({
                user: { ...data },
            }, () => console.log(this.state))
        })
    }
   
    changeComp(newComp){
        this.setState(prev =>{
            return{
                ...prev,
                comp: newComp
            }
        })
    }
    render() {
        return (
            <div>
                <PropfileInfo variant={this.variant} user={this.state.user}></PropfileInfo>
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <a className="nav-link active" aria-current="page" onClick={() => this.changeComp(<ArticleList redir={(elem) => this.changeComp(elem)} variant={this.variant} userId={this.id}/>)}>My posts</a>
                    </li>
                    <li className={`nav-item d-${this.visibility}`}>
                        <a className="nav-link" onClick={() => this.changeComp(<Subs userId={this.id}/>)}>Subscribers</a>
                    </li>
                    <li className={`nav-item d-${this.visibility}`}>
                        <a className="nav-link" onClick={() => this.changeComp(<Publishers userId={this.id}/>)}>Publishers</a>
                    </li>
                    <li className={`nav-item d-${this.visibility}`}>
                        <a className="nav-link" onClick={() => this.changeComp(<SearchPage/>)}>Search</a>
                    </li>
                    <li className={`nav-item d-${this.visibility}`}>
                        <a className="nav-link" onClick={() => this.changeComp(<CreateArticleComp articleId="0"/>)}>Create post</a>
                    </li>
                </ul>
                <div>
                  {this.state.comp}
                </div>
            </div>
        )
    }
}

export default UserPage