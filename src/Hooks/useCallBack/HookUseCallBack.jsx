import React, { useCallback, useState } from 'react'
import Helper from './Helper'

function HookUseCallBack() {
    const [num,setNum] = useState(1)
    const [dark,setDark] = useState(false)
    const getItems = useCallback(() => {
        return [num,num+1,num+2]
    },[num])
    const theme = {
        backgroundColor: dark ? 'black' : 'white',
        color:dark ? 'black' : 'white'
    }
    return (
        <div style={theme} >
        <input type="number" value={num} onChange={e=>setNum(parseInt(e.target.value))} />
        <button onClick={()=>setDark(p=>!p)} >toggle theme</button>
        <Helper getItems={getItems} />
        </div>
    )
}

export default HookUseCallBack
