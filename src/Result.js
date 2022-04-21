import React from 'react';
import {nanoid} from 'nanoid';

export default function Result(props) {
    const showResult= props.result.map((item)=>{
        return(
            <div key={nanoid()}>
                <div className='pregunta'>{item.pre}</div>
                {item.res!==item.cor && <div className='incorrecto'>INCORRECT
                <div className='tu_res'>your choise:{item.res}</div>
                <div className='la_cor'>correct: {item.cor}</div>
                </div>
                }
                {item.res===item.cor && 
                <div className='bien'>WELL DONE!!!</div>
                }
            </div>
        )

    })
  return (
    <div className='quiz'>
      {showResult}
      <button className='btn' onClick={props.again}>Try Again</button>
    </div>
  )
}
