

import React from "react";
import { getUsersArticles } from "../../../UserService";
import Article from "./Article";
import InfinityScroll from "./InfinityScroll";
class ArticleList extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            list: []
        }
    }
    render(){
        return(
            <div> 
                <InfinityScroll height={window.screen.height} id={'lentaTest'} fetchParams={this.props.userId} mapFunc={(item) => {
                return <Article key={item.articleId} variant={this.props.variant} article={item}></Article>
              }} 
              
              fetchFunc={getUsersArticles}/> 
              </div>
        )
    }
}
export default ArticleList