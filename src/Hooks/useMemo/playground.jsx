import {useState,useMemo, useEffect} from 'react'
const PlayGround = () => {
  const [number,setNum] = useState(0)
  const [dark,setDark] = useState(false)
  const doubleNum = useMemo(() => slowFunc(number),[number])
  const theme = useMemo(() =>{
    return{
    backgroundColor: dark ? 'black' : 'white',
    color: dark ? 'white' : 'black'
  }
  },[dark])
  useEffect(() => {
    console.log('calling useEffect');
  },[theme])
  return(
    <>
    <input type="number" value={number} onChange={e => setNum(parseInt(e.target.value))}/>
    <button onClick = {()=>setDark(prevDark=>!prevDark)} >Change theme</button>
    <div style={theme}> {doubleNum} </div>
    </>
  )
}
const slowFunc = (num) => {
  console.log('calling slowFunc')
  for(let i=0;i<1000000000;i++){}
  return num*2
}
export default PlayGround