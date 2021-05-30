import React,{useState,useEffect} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {Row,Col,Container,Tabs,Tab,Form,Button,Spinner,Alert} from 'react-bootstrap';

function Skeleton(){
    const [ssid,setSSID]=useState('');
    const [keySSID,setKeySSID]=useState('');
    const [alias,setAlias]=useState('');
    const [keyAlias,setKeyAlias]=useState('');
    const [alertState,setAlert]=useState({alert:false,alertType:'',alertMessage:''});
    const [progressSSID,setProgressSSID]=useState(false);
    const [progressAlias,setProgressAlias]=useState(false);
    const [isLoading,setIsLoading]=useState(false);
    const [tabValue,setTabValue]=useState("WiFi");
    const [firstFetchedError,setFirstFetchedError]=useState(0);
    const [firstFetchedEmpty,setFirstFetchedEmpty]=useState(0);
    const [secondFetchedError,setSecondFetchedError]=useState(0);
    const [secondFetchedEmpty,setSecondFetchedEmpty]=useState(0);
    const [firstList,setFirstList]=useState([]);
    const [secondList,setSecondList]=useState([]);
 

    function changeSSID(event){
        setSSID(event.target.value);
    }
    function changeKeySSID(event){
        setKeySSID(event.target.value);
    }
    function changeAlias(event){
        setAlias(event.target.value);
    }
    function changeKeyAlias(event){
        setKeyAlias(event.target.value);
    }
    function dismissAlert(){
        setAlert({alert:false,alertType:'',alertMessage:''})
    }
    function switchTab(key){
        if(key==="WiFi"){
            setTabValue("WiFi");
        }
        if(key==="Key"){
            setTabValue("Key");
        }
    }
    function ssidRequest(){
        const url="http://192.168.4.1/api/v1/ap/write"
        setProgressSSID(true);
        axios.post(url,{s:ssid,p:keySSID}).
        then(function (response){
            setProgressSSID(false);
            setAlert({alert:true,alertType:"success",alertMessage:response.data})
        }).then((r)=>{
            axios.get("http://192.168.4.1/api/v1/ap/read").
                    then(function(response){
                    setIsLoading(false);
                    console.log(tabValue);
                    setFirstFetchedError(0);
                    if(!response.data||!response.data.s||response.data.s.length==0){
                        setFirstFetchedEmpty(1);
                    }
                    else{
                        setFirstList(response.data.s);
                        console.log(firstList);
                    }
                 }).
                catch((err)=>{
                    setIsLoading(false);
                    var message=err.response?err.response.data:"undefined error"
                    setFirstFetchedError(1);
                    setFirstFetchedEmpty(1);
                    setAlert({alert:true,alertType:"danger",alertMessage:message})
                })
        }).
        catch((error)=>{
            setProgressSSID(false);
            setAlert({alert:true,alertType:"danger",alertMessage:error.response?error.response.data.toString():"undefined error"}) 
        })
    }
    function removeAccessPoint(name){
        const url="http://192.168.4.1/api/v1/ap/remove"
        setProgressAlias(true);
        axios.post(url,{s:name}).
        then(function (response){
            setProgressAlias(false);
            setAlert({alert:true,alertType:"success",alertMessage:response.data})
        }).then(
            (resp)=>{
                console.log(tabValue);
                    axios.get("http://192.168.4.1/api/v1/ap/read").
                    then(function(response){
                    setIsLoading(false);
                    setFirstFetchedError(0);
                    if(!response.data||!response.data.s||response.data.s.length==0){
                        setFirstFetchedEmpty(1);
                    }
                    else{
                        console.log(response.data.a);
                        setFirstList(response.data.s);
                        console.log(firstList);
                    }
                 }).
                catch((err)=>{
                    setIsLoading(false);
                    var message=err.response?err.response.data:"undefined error"
                    setFirstFetchedError(1);
                    setFirstFetchedEmpty(1);
                    setAlert({alert:true,alertType:"danger",alertMessage:message})
                })
            }
        ).
        catch((error)=>{
            setProgressAlias(false);
            setAlert({alert:true,alertType:"danger",alertMessage:error.response?error.response.data.toString():"undefined error"}) 
        }) 
    }
    function removeAlias(name){
        const url="http://192.168.4.1/api/v1/key/remove"
        setProgressAlias(true);
        axios.post(url,{a:name}).
        then(function (response){
            setProgressAlias(false);
            setAlert({alert:true,alertType:"success",alertMessage:response.data})
        }).then(
            (resp)=>{
                console.log(tabValue);
                    axios.get("http://192.168.4.1/api/v1/key/read").
                    then(function(response){
                    setIsLoading(false);
                    setSecondFetchedError(0);
                    if(!response.data||!response.data.a||response.data.a.length==0){
                        setSecondFetchedEmpty(1);
                    }
                    else{
                        console.log(response.data.a);
                        setSecondList(response.data.a);
                        console.log(secondList);
                    }
                 }).
                catch((err)=>{
                    setIsLoading(false);
                    var message=err.response?err.response.data:"undefined error"
                    setSecondFetchedError(1);
                    setSecondFetchedEmpty(1);
                    setAlert({alert:true,alertType:"danger",alertMessage:message})
                })
            }
        ).
        catch((error)=>{
            setProgressAlias(false);
            setAlert({alert:true,alertType:"danger",alertMessage:error.response?error.response.data.toString():"undefined error"}) 
        }) 
    }
    function aliasRequest(){
        const url="http://192.168.4.1/api/v1/key/write"
        setProgressAlias(true);
        axios.post(url,{a:alias,k:keyAlias}).
        then(function (response){
            setProgressAlias(false);
            setAlert({alert:true,alertType:"success",alertMessage:response.data})
        }).then(
            (resp)=>{
                console.log(tabValue);
                    axios.get("http://192.168.4.1/api/v1/key/read").
                    then(function(response){
                    setIsLoading(false);
                    setSecondFetchedError(0);
                    if(!response.data||!response.data.a||response.data.a.length==0){
                        setSecondFetchedEmpty(1);
                    }
                    else{
                        console.log(response.data.a);
                        setSecondList(response.data.a);
                        console.log(secondList);
                    }
                 }).
                catch((err)=>{
                    setIsLoading(false);
                    var message=err.response?err.response.data:"undefined error"
                    setSecondFetchedError(1);
                    setSecondFetchedEmpty(1);
                    setAlert({alert:true,alertType:"danger",alertMessage:message})
                })
            }
        ).
        catch((error)=>{
            setProgressAlias(false);
            setAlert({alert:true,alertType:"danger",alertMessage:error.response?error.response.data.toString():"undefined error"}) 
        })
    }
    useEffect(
        ()=>{
            async function fetchData(){
                setIsLoading(true);
                if(tabValue==="WiFi"){
                    console.log(tabValue);
                    axios.get("http://192.168.4.1/api/v1/ap/read").
                    then(function(response){
                    setIsLoading(false);
                    console.log(tabValue);
                    setFirstFetchedError(0);
                    if(!response.data||!response.data.s||response.data.s.length==0){
                        setFirstFetchedEmpty(1);
                    }
                    else{
                        setFirstList(response.data.s);
                        console.log(firstList);
                    }
                 }).
                catch((err)=>{
                    setIsLoading(false);
                    var message=err.response?err.response.data:"undefined error"
                    setFirstFetchedError(1);
                    setFirstFetchedEmpty(1);
                    setAlert({alert:true,alertType:"danger",alertMessage:message})
                })
                }
                if(tabValue==="Key"){
                    console.log(tabValue);
                    axios.get("http://192.168.4.1/api/v1/key/read").
                    then(function(response){
                    setIsLoading(false);
                    setSecondFetchedError(0);
                    if(!response.data||!response.data.a||response.data.a.length==0){
                        setSecondFetchedEmpty(1);
                    }
                    else{
                        console.log(response.data.a);
                        setSecondList(response.data.a);
                        console.log(secondList);
                    }
                 }).
                catch((err)=>{
                    setIsLoading(false);
                    var message=err.response?err.response.data:"undefined error"
                    setSecondFetchedError(1);
                    setSecondFetchedEmpty(1);
                    setAlert({alert:true,alertType:"danger",alertMessage:message})
                })
                }
            }
            fetchData();
        },
        [tabValue]
    )
    useEffect(()=>{
        async function fetchAccessPoints(){
            setIsLoading(true);
            axios.get("http://192.168.4.1/api/v1/ap/read").
            then((response)=>{
                console.log("100");
                setIsLoading(false);
                    console.log(tabValue);
                    setFirstFetchedError(0);
                    if(!response.data||!response.data.s||response.data.s.length==0){
                        setFirstFetchedEmpty(1);
                    }
                    else{
                        setFirstList(response.data.s);
                        console.log(firstList);
                    }
            }).
            catch(err=>{
                setIsLoading(false);
                    var message=err.response?err.response.data:"undefined error"
                    setFirstFetchedError(1);
                    setFirstFetchedEmpty(1);
                    setAlert({alert:true,alertType:"danger",alertMessage:message})
            });
        }
        fetchAccessPoints();
    },[tabValue])
    return (
        <Container fluid style={{margin:"0px",paddingLeft:"0px",marginRight:"0px",paddingRight:"0px",paddingBottom:"0px",marginBottom:"0px"}}>
            {!alertState.alert?<div/>:<Alert variant={alertState.alertType}>
                    <Row>
                        <Col xs={10} sm={10} md={10} lg={11} xl={11}>
                            <Alert.Heading><h6>{alertState.alertMessage}</h6></Alert.Heading>
                        </Col>
                        <Col xs={2} sm={2} md={2} lg={1} xl={1}>
                            <div onClick={dismissAlert} style={{cursor:"pointer"}}><u>Close</u></div>
                        </Col>
                    </Row>
                </Alert>
            }
            <div className="separator"/>
            <div className="separator"/>
            <div style={{width:"100%"}}><center>{isLoading?<Spinner animation="border" style={{color:"#335EEA"}}/>:<div/>}</center></div>
            <div className="separator"/>
            <div className="separator"/>
            <div className="mid">
                <div className="card">
                <Tabs fill justify defaultActiveKey="WiFi" id="uncontrolled-tab-example" onSelect={switchTab}>
                        <Tab eventKey="WiFi" title="Wifi" style={{textColor:"black"}}>
                            <div style={{margin:"10px"}}>
                                <div style={{height:"20px"}}/>
                                <Form.Group controlId="ssid1">
                                <Form.Label style={{fontWeight:"500",fontSize:"16px"}}>SSID</Form.Label>
                                <Form.Control type="text" placeholder="Enter the SSID" value={ssid} onChange={changeSSID}/>
                                </Form.Group>
                                <div style={{height:"20px"}}/>
                                <Form.Group controlId="key2">
                                <Form.Label style={{fontWeight:"500",fontSize:"16px"}}>Key</Form.Label>
                                <Form.Control type="password" placeholder="Enter the key" value={keySSID} onChange={changeKeySSID}/>
                                </Form.Group>
                                <div style={{height:"40px"}}/>
                                <Button className="button" disabled={progressSSID} onClick={progressSSID?function(){}:ssidRequest}>{progressSSID?"Loading...":"SUBMIT"}</Button>
                            </div> 
                        </Tab>
                        <Tab eventKey="Key" title="Key">
                            <div style={{margin:"10px"}}>
                                <div style={{height:"20px"}}/>
                                <Form.Group controlId="ssid2">
                                <Form.Label style={{fontWeight:"500",fontSize:"16px"}}>Alias</Form.Label>
                                <Form.Control type="text" placeholder="Enter the Alias" value={alias} onChange={changeAlias}/>
                                </Form.Group>
                                <div style={{height:"20px"}}/>
                                <Form.Group controlId="key2">
                                <Form.Label style={{fontWeight:"500",fontSize:"16px"}}>Key</Form.Label>
                                <Form.Control type="password" placeholder="Enter the key" value={keyAlias} onChange={changeKeyAlias}/>
                                </Form.Group>
                                <div style={{height:"40px"}}/>
                                <Button className="button" disabled={progressAlias} onClick={progressAlias?function(){}:aliasRequest}>{progressAlias?"Loading...":"SUBMIT"}</Button>
                            </div>
                        </Tab>
                    </Tabs>
                </div>
            </div>
            <div className="separator" style={{height:"12vh"}}/>
            <div className="bottom">
                <div className="list-card" style={{width:"350px",overflow:"scroll"}}>
                {tabValue=="WiFi"?firstList.map(person=>
                            <div className="list-item" style={{marginBottom:"4px"}}>
                            <Button variant="danger" className="remove-button" onClick={async()=>{await removeAccessPoint(person)}}>DELETE</Button>
                                    <div className="f1-list">
                                        {person}
                            </div>
                            </div>
                        ):secondList.map(person=>
                            <div className="list-item" style={{marginBottom:"4px"}}>
                            <Button variant="danger" className="remove-button" onClick={async()=>{await removeAlias(person)}}>DELETE</Button>
                                    <div className="f1-list">
                                        {person}
                            </div>
                            </div>
                        )
                }
                </div>                
            </div>
            <div className="separator" style={{height:"15vh"}}/>
        </Container>
        //if list is empty dont show the box, if not empty show the box, if error occurs refetch button
    );
}
export default Skeleton