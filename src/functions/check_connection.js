import axios from 'axios';
import {IP} from './urls.js';

function checkConnection(){
    return new Promise((resolve,reject)=>{
        axios.get(IP+"device-status")
        .then((response)=>{
            console.log(response.status)
            resolve('connected')
        })
        .catch((err)=>{
            console.log(err)
            reject('disconnected')
        })
    })
}

export default checkConnection