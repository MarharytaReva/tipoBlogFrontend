import React from "react";
import { getNews } from '../../UserService'
import { AppContext } from '../../Context'
import Article from "./childComponents/Article";
import InfinityScroll from "./childComponents/InfinityScroll";

class NewsPage extends React.Component{
    constructor(props){
        super(props)
        this.variant = localStorage.getItem('id') ? 'async' : 'none'
        this.userId = 0
    }
    componentDidMount(){
        this.userId = this.context.isAuthorized == true ? localStorage.getItem('id') : 0
    }
    render(){
        return(
            <>
              <InfinityScroll height={window.screen.height} id={'lentaTest'} fetchParams={this.userId} mapFunc={(item) => {
              return <Article key={item.articleId} variant={this.variant} article={item}></Article>
            }} 
            
            fetchFunc={getNews}/> 
            </>
        )
    }
}
NewsPage.contextType = AppContext
export default NewsPage