import React, { useState } from 'react'
import {nanoid} from 'nanoid';


export default function Quiz(props) {

    
    const [selected, setSelected]=useState([]);
    const [pregunta, setPregunta]=useState([]);
    const [show, setShow]=useState(true);
    
    
    
    
  

    function ordRes(item){
        let incorrectas=item.incorrect_answers;
        let correcta=item.correct_answer;
        let a=Math.floor(Math.random()*4);
        let opciones= [];
    
         if(a===0){
            opciones[0]=correcta;
            opciones[1]=incorrectas[0];
            opciones[2]=incorrectas[1];
            opciones[3]=incorrectas[2];
        }else{
            if(a===1){
                opciones[0]=incorrectas[0];
                opciones[1]=correcta;
                opciones[2]=incorrectas[1];
                opciones[3]=incorrectas[2];
            }
            if(a===2){
                opciones[0]=incorrectas[0];
                opciones[1]=incorrectas[1];
                opciones[2]=correcta;
                opciones[3]=incorrectas[2];
            }
            if(a===3){
                opciones[0]=incorrectas[0];
                opciones[1]=incorrectas[1];
                opciones[2]=incorrectas[2];
                opciones[3]=correcta;
            }
        }
        


        return opciones;
    }

    function checaRespuesta(item,res,pre,op){
        let array=selected;
        let array2=pregunta;
        array2.push(pre);
        array.push(res);
        setSelected(array);
        setPregunta(array2);
        let selec= document.getElementById(`op${op}pre${pre}`);
        selec.style.background= "#D6DBF5";
        let op1= document.getElementById(`op0pre${pre}`);
        let op2= document.getElementById(`op1pre${pre}`);
        let op3= document.getElementById(`op2pre${pre}`);
        let op4= document.getElementById(`op3pre${pre}`);
        op1.disabled=true;
        op2.disabled=true;
        op3.disabled=true;
        op4.disabled=true;
        if(pregunta.length>4){
            setShow(false);
        }
            
        
        
        
        return
    }
    function hazId(op,pre){
        let id="";
        id=`op${op}pre${pre}`;
        return id;
    }
    
    const showTrivia = props.trivia.map((item, ind)=>{
        const opciones = ordRes(item);
        return(
            <div key={nanoid()}>
                <div key={nanoid()} className='pregunta'>{item.question}</div>
                <div key={nanoid()} className='opciones'>
                    <button id={hazId(0,ind)} key={nanoid()} 
                    onClick={()=>checaRespuesta(item,opciones[0],ind,0)}
                    className='opcion'>{opciones[0]}</button>
                    <button id={hazId(1,ind)} key={nanoid()} 
                    onClick={()=>checaRespuesta(item,opciones[1],ind,1)}
                    className='opcion'>{opciones[1]}</button>
                    <button id={hazId(2,ind)} key={nanoid()} 
                    onClick={()=>checaRespuesta(item,opciones[2],ind,2)}
                    className='opcion'>{opciones[2]}</button>
                    <button id={hazId(3,ind)} key={nanoid()} 
                    onClick={()=>checaRespuesta(item,opciones[3],ind,3)}
                    className='opcion'>{opciones[3]}</button>
                </div>
                <hr/>
            </div>
        )
    })
  
  return (
    <div className='quiz'>
        {showTrivia}
        <button className='btn' disabled={show} onClick={()=>props.result(props.trivia,pregunta,selected)}>Show Results</button>
        <hr/>
    </div>
  )
}
