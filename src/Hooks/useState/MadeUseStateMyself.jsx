import React from 'react'
import ReactDOM from 'react-dom';



function MadeUseStateMyself() {
  const [minutes,setMinutes] = useState(5)
  const [error,setError] = useState(null)
  
  const handleAdd = () => {
      if(minutes<9){
          setMinutes(minutes+1)
          setError(null)
      }
      else{
          setError('Less than 10 please')
      }
  }
  const handleSubStract = () => {
    if(minutes>0){
        setMinutes(minutes-1)
        setError(null)
    }
    else{
        setError('More than 0 please')
    }
}

  return (
    <React.Fragment>
        <button onClick={handleSubStract} > - </button>
        <p>{minutes}</p>
        <button onClick={handleAdd} > + </button>
        {error && <div>{error}</div>}
    </React.Fragment>
  )
}
const states = []
let calls = -1
const useState = def => {
    const callId = ++calls
    if(states[callId]) {
        return states[callId]
    }
    const setDef = newV => {
       states[callId][0] = newV
       reRender()
    }
    const state = [def,setDef]
    states.push(state)
    return state
}
function reRender(){
    calls = -1
    ReactDOM.render(<MadeUseStateMyself/>,document.getElementById('root'))
}
reRender()
export default MadeUseStateMyself