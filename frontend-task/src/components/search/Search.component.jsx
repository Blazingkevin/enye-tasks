import React from 'react'; 
import './Search.styles.scss';

export default ({filter})=> {
    return <input onChange={(evt)=> {
        filter(null, evt.target.value)
    }} id="search" type="search" placeholder="by first name or last name"/>
}