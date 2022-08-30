
import React, { useState, useEffect, useRef } from 'react';
import $ from 'jquery';
import Loader from './Loader';

function InfinityScroll(props) {
    const [list, setList] = useState([]);
    const hasMore = useRef(true)
    const counterRef = useRef(1);
    const inProcessRef = useRef(false);
  useEffect(() => {
    fetchNext();
    let elem = document.getElementById(props.id)
    elem.addEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    inProcessRef.current = false
  }, [list]);
  const fetchNext = () => {
    props.fetchFunc(props.fetchParams, (counterRef.current), (response) => {
        console.log(response)
      let maped = response.map(x => props.mapFunc(x))
      setList(oldArr => {
        hasMore.current = maped.length != 0
        
        return [...oldArr, ...maped]
      })
    }, () => {})
    
  }

    const handleScroll = () => {
      console.log('has more', hasMore.current)
      if(inProcessRef.current == false && hasMore.current == true){
        let userScrollHeight = window.innerHeight + window.scrollY;
        let windowBottomHeight = document.documentElement.offsetHeight;
        let loadDot = parseInt((windowBottomHeight * 80) / 100)
  
        if (userScrollHeight >= windowBottomHeight || userScrollHeight >= loadDot) {
        inProcessRef.current = true
        counterRef.current++
        fetchNext();
        }
    }
  };
    return (
        <div id={`${props.id}`} style={{'height': `${props.height}px`, 'overflowY': 'scroll'}}>
            {list}
            <div style={{'display': 'flex', 'justifyContent': 'center'}}>
                <div style={{'display': `${hasMore.current ? 'none' : 'block'}`}} className='mb-3 mt-2 infoText'>This is the end</div>
            </div>
            <Loader display={`${hasMore.current ? 'block' : 'none'}`}></Loader>
        </div>
    )
}
export default InfinityScroll;