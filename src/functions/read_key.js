import axios from 'axios';
import {IP} from './urls.js';

function readKey(){
    return new Promise(function(resolve,reject){
        axios.get(IP+"api/v1/key/read")
        .then((response)=>{
            resolve(response.data.a)
        })
        .catch((err)=>{
            var message=err.response?err.response.data:"An Error Occurred!"
            reject(message)
        })
    })
}

export default readKey