import axios from 'axios';
import {IP} from './urls.js';

function getAPList(){
    return new Promise(function(resolve,reject){
        axios.get(IP+"api/v1/ap/read")
        .then((response)=>{
            resolve(response.data.s)
        })
        .catch((err)=>{
            var message=err.response?err.response.data:"An Error Occurred!"
            reject(message)
        })
    })
}

export default getAPList