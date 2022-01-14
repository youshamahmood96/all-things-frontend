import React, { useEffect, useState } from 'react'

function Helper({getItems}) {
    const [items,setItems] = useState([])
    useEffect(()=>{
        setItems(getItems())
        console.log('calling useEffect');
    },[getItems])
    return items.map(item=><div key={item} >{item}</div>)
}

export default Helper
