import useInterval from 'react-useinterval';
import {useState} from 'react';
import checkConnection from '../../functions/check_connection.js';
import './connection_component.css';

function ConnectionChecker(){
  const [isConnected,setIsConnected]=useState(false);

  useInterval(()=>{
    checkConnection().then((response)=>{
      setIsConnected(true);
    }).catch((err)=>{
      setIsConnected(false);
    })
  },2000)

  function connectionMessage(){
    if(isConnected){
      return "Connected!"
    }
    return "Disconnected"
  }

  function colorStyle(){
    if(!isConnected){
      return {color: "red"}
    }
    return {color:"#346751"}
  }
  
  return (
    <div className="connection-box">
        <div style={colorStyle()} className="text-connection">
          {connectionMessage()}
        </div>
    </div>
  )
}

export default ConnectionChecker

