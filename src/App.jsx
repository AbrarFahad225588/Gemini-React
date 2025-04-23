import React, { useContext } from "react";
import "./App.css";
import { CiMicrophoneOn } from "react-icons/ci";
import va from "./assets/ai3.png";
import spimg from './assets/aiVoice.gif'
import spimg2 from './assets/speak.gif'
import { datacontext } from "./context/UserContext";
const App = () => {
   let {recognition,speaking,setSpeaking,prompt,setPrompt,response,setResponse}=useContext(datacontext)
   
  return (
    <div className="main">
      <img src={va} alt="" id="rfahad" />
      <span>
        Robo Fahad
      </span>
      {
        (!speaking)? <button onClick={()=>{
          setPrompt('Listening...')
          setSpeaking(true);
          setResponse(false)
          recognition.start()
        }}>Speak <CiMicrophoneOn /> </button>
        :
        <div className="response">
          {(!response)?<img src={spimg} alt=""  id="speak" />:
            <img src={spimg2} alt=""  id="speak2" />
          }
          
          <p>{prompt}</p>
        </div>
      }
      
    </div>
  );
};

export default App;
