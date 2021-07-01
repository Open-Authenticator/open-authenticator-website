import axios from 'axios';
import {IP} from './urls.js';

function APWrite(ssid,key){
    return new Promise(function(resolve,reject){
    axios.post(IP+"api/v1/ap/write",{s:ssid,p:key})
        .then(function(response){
            resolve(response.data)
        })
        .catch((err)=>{
            console.log("Hi")
            reject(err.data)
        })
    })
}

export default APWrite