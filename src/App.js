import './App.css';
import React, {useState, useEffect} from 'react';
import Quiz from './Quiz';
import Result from './Result';

function App() {
  const [quiz, setQuiz]=useState([]);
  const [welcome, setWelcome]=useState(true);
  const [showResult, setShowResult]= useState(false);
  const [resultados, setResultados]= useState([]);
  const [category, setCategory]=useState(9);

  useEffect(function () {
    fetch(`https://opentdb.com/api.php?amount=50&category=${category}&difficulty=easy&type=multiple`)
    .then(res=> res.json())
    .then(data=> {
        setQuiz(data.results);
    })
  }, [category])



  /* general=9, history=23, tv=14, geografy=22*/
  
 const trivia = ()=> {
    let array = [];
    let arrayTemp = quiz;
    if (quiz.length>0){
      for (let i=0; i<5;i++){
        let number = Math.floor(Math.random()*arrayTemp.length);
          array[i]= arrayTemp[number];

          arrayTemp = arrayTemp.filter(item=>item.question!==array[i].question);
          
      }
    }
    
    return array;
  } 

  function toggleWelcome() {
    setWelcome(prev=> !prev);
  }
  function muestraResult(tri,pre,res) {
    
    let arrayTemp=[];
    let arrayTemp2=[];
    for(let i=0;i<tri.length;i++){
      arrayTemp[i]={
        cor: tri[i].correct_answer,
        pre: tri[i].question,
        res: ""
      }
    }
     for(let j=0;j<tri.length;j++){
      arrayTemp2[pre[j]]={
        ...arrayTemp[pre[j]],
        res: res[j]
      }
    } 
    setShowResult(prev=> !prev);
    setResultados(arrayTemp2);
  }
  function cambiaCategory(){
    let op=document.getElementById('selec');
    if(op.value==="1"){
      setCategory(9);
    }else if(op.value==="2"){
      setCategory(14);
    }else if(op.value==="3"){
      setCategory(23);
    }else if(op.value==="4"){
      setCategory(22);
    }
  }
  
  return (
    <div className="App">
      { welcome &&
      <div className="trivia">
                <h1>Trivia Game</h1>
                <select id='selec' onChange={cambiaCategory} className='selec'>
                  <option value="1">General</option>
                  <option value="2">T.V.</option>
                  <option value="3">History</option>
                  <option value="4">Geografy</option>
                </select>
                <button 
                    className="btn" 
                    onClick={toggleWelcome}
                >
                    Comenzar
                </button>
      </div>
      }
      {!welcome && !showResult && <div><Quiz trivia={trivia()} result={muestraResult} /></div>}
      {showResult && <Result result={resultados}/>}
    </div>
  );
}

export default App;
