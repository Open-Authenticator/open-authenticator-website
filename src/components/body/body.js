import "bulma/css/bulma.css";
import "./logo.css";
import "./form_holder.css";
import './card_box.css';
import { imageURL, IP } from "../../functions/urls";
import {Tabs,Tab,Button,Form,ProgressBar} from 'react-bootstrap';
import { useEffect, useState } from "react";
import getAPList from "../../functions/get_ap";
import readKey from "../../functions/read_key";
import axios from 'axios';
import {ListItemAlias, ListItemSSID} from './list-item.js';

function Body(props) {
  const [activeTab,switchTab]=useState("WiFi")
  const [valueSSID,setSSID]=useState('');
  const [valueAlias,setAlias]=useState('');
  const [ssidKey,setSSIDKey]=useState('');
  const [aliasKey,setAliasKey]=useState('');
  const [ssidList,setSSIDList]=useState([]);
  const [aliasList,setAliasList]=useState([]);
  const [fetchSSIDError,setFetchSSIDError]=useState('');
  const [fetchAliasError,setFetchAliasError]=useState('');
  const [progress,setProgress]=useState(false);
  const [addSSIDError,setAddSSIDError]=useState('');
  const [addAliasError,setAddAliasError]=useState('');
  const [addAliasSuccess,setAddAliasSuccess]=useState('');
  const [addSSIDSuccess,setAddSSIDSuccess]=useState('');
  const [ssidLoading,setSSIDLoading]=useState(false);
  const [aliasLoading,setAliasLoading]=useState(false);
  const [messageToShow,setMessageToShow]=useState('');
  const [messageToShowType,setMessageToShowType]=useState('none');

  function displayMessage(message,type){
    setMessageToShow(message)
    setMessageToShowType(type)
    setTimeout(
      ()=>{
        setMessageToShow('')
        setMessageToShowType('none')
      },
      1500
    )
  }
  function removeSSID(name){
    setTimeout(()=>{},3000)
  }
  function removeAlias(name){
    setTimeout(()=>{},3000)
  }
  function messageHandler(){
    if(messageToShowType==='none'){
      return <div></div>
    }
    if(messageToShowType==='success'){
      return <div className="show-message-remove" style={{backgroundColor:"green"}}>{messageToShow}</div>
    }
    if(messageToShowType==='failed'){
      return <div className="show-message-remove" style={{backgroundColor:"red"}}>{messageToShow}</div>
    }
  }

  function enrollWiFi(){
    if(!valueSSID||!ssidKey){
      setAddSSIDSuccess('')
      setAddSSIDError('Please enter valid details')
      return;
    }
    setProgress(true);
    setSSIDLoading(true);
    axios.post(IP+"api/v1/ap/write",{s:valueSSID,p:ssidKey}).then(
      (response)=>{
        setProgress(!true);
        setSSIDLoading(!true);
        setAddSSIDError('')
        setAddSSIDSuccess(response.data)
        setTimeout(
          ()=>{
            setAddAliasError('')
            setAddAliasSuccess('')
            setAddSSIDSuccess('')
            setAddSSIDError('')
          },
          3000
        )
        setProgress(true)
        setSSIDList([]);
        getAPList()
        .then((response)=>{
          setTimeout(
            ()=>{
              setProgress(false)
              setSSIDList(response)
              setFetchSSIDError('')
            },
            900
          )
        })
        .catch((err)=>{
          setTimeout(
            ()=>{
              setProgress(false)
              setSSIDList([])
              setFetchSSIDError(err)
            },
            900
          )
        })
      }
    ).catch(
      (err)=>{
        setProgress(!true);
        setSSIDLoading(!true);
        setAddSSIDSuccess('')
        if(err&&err.response&&err.response&&err.response.data){
          setAddSSIDError(err.response.data)
        }
        else{
          setAddSSIDError("An Error Occurred!")
        }
        setTimeout(
          ()=>{
            setAddAliasError('')
            setAddAliasSuccess('')
            setAddSSIDSuccess('')
            setAddSSIDError('')
          },
          3000
        )
      }
    )
  }

  function enrollAlias(){
    if(!valueAlias||!aliasKey){
      setAddAliasSuccess('')
      setAddAliasError('Please enter valid details')
      return;
    }
    setProgress(true);
    setAliasLoading(true);
    axios.post(IP+"api/v1/key/write",{a:valueAlias,k:aliasKey})
    .then((response)=>{
      setProgress(!true);
        setAliasLoading(!true);
        setAddAliasError('')
        setAddAliasSuccess(response.data)
        setTimeout(
          ()=>{
            setAddAliasError('')
            setAddAliasSuccess('')
            setAddSSIDSuccess('')
            setAddSSIDError('')
          },
          3000
        )
        setProgress(true)
        setAliasList([])
          readKey().then((response)=>{
            setTimeout(
              ()=>{
                setProgress(false)
                setAliasList(response)
                setFetchAliasError('')
              },
              900
            )
          }).catch((err)=>{
            setTimeout(
              ()=>{
                setProgress(false)
                setAliasList([])
                setFetchAliasError(err)
              },
              900
          )
        })
    })
    .catch((err)=>{
      setProgress(!true);
        setAliasLoading(!true);
        setAddAliasSuccess('')
        if(err&&err.response&&err.response&&err.response.data){
          setAddAliasError(err.response.data)
        }
        else{
          setAddAliasError("An Error Occurred!")
        }
        setTimeout(
          ()=>{
            setAddAliasError('')
            setAddAliasSuccess('')
            setAddSSIDSuccess('')
            setAddSSIDError('')
          },
          3000
        )
    })
    
  }

  function ssidMessage(){
    if(addSSIDError===''&&addSSIDSuccess===''){
      return <div style={{height:"10.5px"}}/>
    }
    if(addSSIDSuccess!==''&&addSSIDError===''){
      return <div style={{color:"green",marginTop:"20px",marginBottom:"20px",fontFamily:"monospace",position:"relative"}} className="center-text message-font">{addSSIDSuccess}</div>
    }
    if(addSSIDSuccess===''&&addSSIDError!==''){
      return <div style={{color:"red",marginTop:"20px",marginBottom:"20px",fontFamily:"monospace",position:"relative"}} className="center-text message-font">{addSSIDError}</div>
    }
  }

  function aliasMessage(){
    if(addAliasError===''&& addAliasSuccess===''){
      return <div style={{height:"10.5px"}}/>
    }
    if(addAliasSuccess!==''&&addAliasError===''){
      return <div style={{color:"green",marginTop:"20px",marginBottom:"20px",fontFamily:"monospace"}} className="center-text message-font">{addAliasSuccess}</div>
    }
    if(addAliasSuccess===''&&addAliasError!==''){
      return <div style={{color:"red",marginTop:"20px",marginBottom:"20px",fontFamily:"monospace"}} className="center-text message-font">{addAliasError}</div>
    }
  }

  function changeTab(selectedTab){
    switchTab(selectedTab)
  }
  function writeSSID(event){
    setSSID(event.target.value);
  }
  function writeSSIDKey(event){
    setSSIDKey(event.target.value);
  }
  function writeAlias(event){
    setAlias(event.target.value)
  }
  function writeAliasKey(event){
    setAliasKey(event.target.value);
  }

  function emptyKey(){
    return (
      <div className="list-holder" style={{height: "4rem",display:"flex",alignItems:"center",fontFamily:"monospace",fontWeight:"bold",justifyContent:"center"}}>
        <div style={{position:"absolute",margin:"auto 10px",color:"teal"}} className="error-font">No Keys Enrolled</div>
      </div>
    )
  }

  function emptySSID(){
    return (
      <div className="list-holder" style={{height: "4rem",display:"flex",alignItems:"center",fontFamily:"monospace",fontWeight:"bold",justifyContent:"center"}}>
        <div style={{position:"absolute",margin:"auto 10px",color:"teal"}} className="error-font">No WiFi Enrolled</div>
      </div>
    )
  }

  function errorWiFi(){
    return (
      <div className="list-holder" style={{height: "4rem",display:"flex",alignItems:"center",fontFamily:"monospace",fontWeight:"bold",justifyContent:"center"}}>
        <div style={{position:"absolute",margin:"auto 10px",color:"red"}} className="error-font">Could not fetch WiFi</div>
      </div>
    )
  }

  function errorKey(){
    return (
      <div className="list-holder" style={{height: "4rem",display:"flex",alignItems:"center",fontFamily:"monospace",fontWeight:"bold",justifyContent:"center"}}>
        <div style={{position:"absolute",margin:"auto 10px",color:"red"}} className="error-font">Could not fetch Keys</div>
      </div>
    )
  }

  useEffect(
    ()=>{
      const fetchData=()=>{
        setProgress(true);
        setSSIDList([])
        setFetchSSIDError('')
        setAliasList([])
        setFetchAliasError('')
        if(activeTab==="WiFi"){
          setSSIDList([])
          getAPList().then((response)=>{
            setTimeout(
              ()=>{
                setProgress(false)
                setSSIDList(response)
                setFetchSSIDError('')
              },
              900
            )
          }).catch((err)=>{
            setTimeout(
              ()=>{
                setProgress(false)
                setSSIDList([])
                setFetchSSIDError(err)
              },
              900
            )
          })
        }
        if(activeTab==="Key"){
          setAliasList([])
          readKey().then((response)=>{
            setTimeout(
              ()=>{
                setProgress(false)
                setAliasList(response)
                setFetchAliasError('')
              },
              900
            )
          }).catch((err)=>{
            setTimeout(
              ()=>{
                setProgress(false)
                setAliasList([])
                setFetchAliasError(err)
              },
              900
            )
          })
        }
      }
      fetchData()
    },
    [activeTab]
  )
  function listProvider(){
    if(activeTab==="WiFi"){
      if(ssidList.length===0&&fetchSSIDError===""){
        return emptySSID()
      }
      if(fetchSSIDError!==""){
        return errorWiFi()
      }
      return (
        <div className="list-holder">
          {
            ssidList.map((item)=>{return <ListItemSSID name={item} removeSSID={removeSSID} 
              handleAction={()=>{
                setProgress(true);
                axios.post(IP+"api/v1/ap/remove",{s:item})
                .then(
                  (response)=>{
                    displayMessage(response.data,"success")
                    getAPList()
                    .then((res)=>{
                      setTimeout(
                        ()=>{
                          setProgress(false)
                          setSSIDList(res)
                          setFetchSSIDError('')
                        },
                        3000
                      )
                    })
                    .catch((err)=>{
                      setProgress(false)
                      setSSIDList([])
                      setFetchSSIDError(err)
                    })
                  }
                )
                .catch((err)=>{
                    setProgress(false);
                    displayMessage(err.response.data?err.response.data:"An Error Occurred","failed")
                })
              }}
            />})
          }
        </div>
      )
    }
    if(activeTab==="Key"){
      if(aliasList.length===0&&fetchAliasError===""){
        return emptyKey()
      }
      if(fetchAliasError!==""){
        return errorKey()
      }
      return (
        <div className="list-holder">
          {
            aliasList.map((item)=><ListItemAlias name={item} removeAlias={removeAlias}
            handleAction={()=>{
              setProgress(true);
              axios.post(IP+"api/v1/key/remove",{a:item})
              .then(
                (response)=>{
                  displayMessage(response.data,"success")
                  readKey()
                  .then((res)=>{
                    setTimeout(
                      ()=>{
                        setProgress(false)
                        setAliasList(res)
                        setFetchAliasError('')
                      },
                      3000
                    )
                  })
                  .catch((err)=>{
                    setProgress(false)
                    setAliasList([])
                    setFetchAliasError(err)
                  })
                }
              )
              .catch((err)=>{
                  setProgress(false);
                  displayMessage(err.response.data?err.response.data:"An Error Occurred","failed")
              })
            }}
            />)
          }
        </div>
      )
    }
  }




  function getProgress(){
    if(progress){
      return <ProgressBar animated now={100} variant="info" style={{height:"6px"}}/>
    }
    return <div/>    
  }
  return (
    <div className="block">
      <div className="block">
        <div className="block is-paddingless" style={{ overflow: "auto" }}>
          <div style={{ position: "relative", overflow: "hidden" }}>
            {getProgress()}
            <div className="columns is-0 is-gapless">
              <div className="is-vertically-centered column is-5 is-multiline is-variable" style={{backgroundColor:"white"}}>
                <div className="img-block" style={{backgroundColor:"white"}}>
                  <img src={imageURL} className="img-src" alt="logo" style={{backgroundColor:"white"}}/>
                </div>
              </div>
              <div className="column is-7" style={{overflowY:"auto"}}>
                <div style={{height:"10px"}}/>
                <div className="card-top">
                  <Tabs fill justify defaultActiveKey="WiFi" activeKey={activeTab} onSelect={changeTab} className="tab-holder">
                    <Tab eventKey="WiFi" title="WiFi">
                      <div style={{height:"5px"}}/>
                      <div className="center-text">
                        <Form.Group controlId="ssid">
                          <Form.Label className="label-field">SSID</Form.Label>
                          <Form.Control type="text" placeholder="Enter the SSID" componentClass="input" value={valueSSID} onChange={writeSSID}/>
                        </Form.Group>
                      </div>
                      <div style={{height:"3px"}}/>
                      <div className="center-text">
                        <Form.Group controlId="key1">
                          <Form.Label className="label-field">Key</Form.Label>
                          <Form.Control type="password" placeholder="Enter the Key" componentClass="input" value={ssidKey} onChange={writeSSIDKey} style={{outline:"none"}}/>
                        </Form.Group>
                      </div>
                      {ssidMessage()}
                      <Button className="button-submit shadow-none" variant="dark" block style={{position:"relative",margin:"10px auto"}} disabled={ssidLoading} onClick={enrollWiFi}>{ssidLoading?"WORKING...":"SUBMIT"}</Button>
                    </Tab>
                    <Tab eventKey="Key" title="Key">
                      <div style={{height:"5px"}}/>
                        <div className="center-text">
                          <Form.Group controlId="ssid">
                            <Form.Label className="label-field">Alias</Form.Label>
                            <Form.Control type="text" placeholder="Enter the Alias" componentClass="input" value={valueAlias} onChange={writeAlias}/>
                          </Form.Group>
                        </div>
                        <div style={{height:"3px"}}/>
                        <div className="center-text">
                          <Form.Group controlId="key1">
                            <Form.Label className="label-field">Key</Form.Label>
                            <Form.Control type="password" placeholder="Enter the Key" componentClass="input" value={aliasKey} onChange={writeAliasKey} style={{outline:"none"}}/>
                          </Form.Group>
                        </div>
                        {aliasMessage()}
                        <Button className="button-submit shadow-none" variant="dark" block style={{position:"relative",margin:"10px auto"}} disabled={aliasLoading} onClick={enrollAlias}>{aliasLoading?"WORKING...":"SUBMIT"}</Button>
                    </Tab>
                  </Tabs>
                </div>
                {messageHandler()}
                {listProvider()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Body;
